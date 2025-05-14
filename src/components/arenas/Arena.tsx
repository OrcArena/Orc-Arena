import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

type ArenaType = 'ruined-city' | 'enchanted-forest' | 'molten-fortress' | 'wraith-cemetery' | 'thunder-gorge';

interface ArenaProps {
  type: ArenaType;
}

const Arena: React.FC<ArenaProps> = ({ type }) => {
  // Load appropriate arena model based on type
  const { nodes, materials } = useGLTF(`/models/arenas/${type}.glb`);

  // Arena-specific effects and properties
  const getArenaProperties = (type: ArenaType) => {
    switch (type) {
      case 'ruined-city':
        return {
          fogColor: '#232323',
          fogDensity: 0.02,
          ambientLight: 0.4,
        };
      case 'enchanted-forest':
        return {
          fogColor: '#2a4d2a',
          fogDensity: 0.03,
          ambientLight: 0.5,
        };
      case 'molten-fortress':
        return {
          fogColor: '#4d2a2a',
          fogDensity: 0.02,
          ambientLight: 0.6,
        };
      case 'wraith-cemetery':
        return {
          fogColor: '#1a1a2a',
          fogDensity: 0.04,
          ambientLight: 0.3,
        };
      case 'thunder-gorge':
        return {
          fogColor: '#2a2a4d',
          fogDensity: 0.02,
          ambientLight: 0.4,
        };
      default:
        return {
          fogColor: '#232323',
          fogDensity: 0.02,
          ambientLight: 0.4,
        };
    }
  };

  const properties = getArenaProperties(type);

  return (
    <group>
      <fog attach="fog" args={[properties.fogColor, 0, 50]} />
      <ambientLight intensity={properties.ambientLight} />
      <primitive object={nodes.Arena} />
      {/* Add arena-specific effects and obstacles here */}
    </group>
  );
};

export default Arena;

// Preload all arena models
const arenaTypes: ArenaType[] = ['ruined-city', 'enchanted-forest', 'molten-fortress', 'wraith-cemetery', 'thunder-gorge'];
arenaTypes.forEach(type => useGLTF.preload(`/models/arenas/${type}.glb`));