import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Group, Vector3 } from 'three';

interface OrcCharacterProps {
  position: [number, number, number];
}

const OrcCharacter: React.FC<OrcCharacterProps> = ({ position }) => {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF('/models/orc-warrior.glb');
  const { actions, names } = useAnimations(animations, group);

  // Character state
  const moveDirection = useRef(new Vector3());
  const currentAnimation = useRef('idle');

  useEffect(() => {
    // Start idle animation by default
    if (actions['idle']) {
      actions['idle'].play();
    }

    // Cleanup animations
    return () => {
      Object.values(actions).forEach(action => action?.stop());
    };
  }, [actions]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Update character position and rotation based on input
    const speed = 5;
    group.current.position.addScaledVector(moveDirection.current, speed * delta);

    // Update animations based on movement
    const isMoving = moveDirection.current.lengthSq() > 0.1;
    if (isMoving && currentAnimation.current !== 'run') {
      actions['run']?.fadeIn(0.2).play();
      actions['idle']?.fadeOut(0.2);
      currentAnimation.current = 'run';
    } else if (!isMoving && currentAnimation.current !== 'idle') {
      actions['idle']?.fadeIn(0.2).play();
      actions['run']?.fadeOut(0.2);
      currentAnimation.current = 'idle';
    }
  });

  return (
    <group ref={group} position={position} dispose={null}>
      <primitive object={nodes.OrcWarrior} />
      {/* Add weapon attachment points and effects here */}
    </group>
  );
};

export default OrcCharacter;

// Preload model
useGLTF.preload('/models/orc-warrior.glb');