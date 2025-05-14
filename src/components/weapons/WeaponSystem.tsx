import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Vector3 } from 'three';

export type WeaponType = 'pistol' | 'sniper' | 'minigun' | 'smg' | 'shotgun';

interface WeaponStats {
  damage: number;
  fireRate: number; // shots per second
  range: number;
  magazineSize: number;
  reloadTime: number; // seconds
}

const WEAPON_STATS: Record<WeaponType, WeaponStats> = {
  pistol: {
    damage: 25,
    fireRate: 2,
    range: 50,
    magazineSize: 17,
    reloadTime: 1.5,
  },
  sniper: {
    damage: 100,
    fireRate: 0.5,
    range: 200,
    magazineSize: 5,
    reloadTime: 2.5,
  },
  minigun: {
    damage: 15,
    fireRate: 50,
    range: 100,
    magazineSize: 200,
    reloadTime: 4,
  },
  smg: {
    damage: 20,
    fireRate: 10,
    range: 40,
    magazineSize: 30,
    reloadTime: 1.8,
  },
  shotgun: {
    damage: 80,
    fireRate: 1,
    range: 20,
    magazineSize: 5,
    reloadTime: 2,
  },
};

interface WeaponSystemProps {
  type: WeaponType;
  position: [number, number, number];
  onFire?: (position: Vector3, direction: Vector3) => void;
}

const WeaponSystem: React.FC<WeaponSystemProps> = ({ type, position, onFire }) => {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF(`/models/weapons/${type}.glb`);
  
  // Weapon state
  const [ammo, setAmmo] = useState(WEAPON_STATS[type].magazineSize);
  const [isReloading, setIsReloading] = useState(false);
  const lastFireTime = useRef(0);

  const fire = () => {
    if (!group.current || isReloading || ammo <= 0) return;

    const currentTime = performance.now();
    const timeSinceLastFire = currentTime - lastFireTime.current;
    const minTimeBetweenShots = 1000 / WEAPON_STATS[type].fireRate;

    if (timeSinceLastFire < minTimeBetweenShots) return;

    // Update ammo and fire time
    setAmmo(prev => prev - 1);
    lastFireTime.current = currentTime;

    // Calculate fire direction
    const position = new Vector3();
    const direction = new Vector3(0, 0, -1);
    group.current.getWorldPosition(position);
    direction.applyQuaternion(group.current.quaternion);

    // Trigger fire effect
    onFire?.(position, direction);

    // Auto reload when empty
    if (ammo <= 1) {
      reload();
    }
  };

  const reload = () => {
    if (isReloading) return;
    
    setIsReloading(true);
    setTimeout(() => {
      setAmmo(WEAPON_STATS[type].magazineSize);
      setIsReloading(false);
    }, WEAPON_STATS[type].reloadTime * 1000);
  };

  useFrame((state, delta) => {
    if (!group.current) return;

    // Add weapon-specific animations and effects
    switch (type) {
      case 'minigun':
        // Spin barrel when firing
        if (lastFireTime.current > performance.now() - 100) {
          group.current.rotation.z += delta * 10;
        }
        break;
      // Add other weapon-specific animations
    }
  });

  return (
    <group ref={group} position={position} dispose={null}>
      <primitive object={nodes.Weapon} />
      {/* Add muzzle flash and other effects here */}
    </group>
  );
};

export default WeaponSystem;

// Preload all weapon models
const weaponTypes: WeaponType[] = ['pistol', 'sniper', 'minigun', 'smg', 'shotgun'];
weaponTypes.forEach(type => useGLTF.preload(`/models/weapons/${type}.glb`));