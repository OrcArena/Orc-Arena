import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box, Container } from '@mui/material';
import GameScene from './components/GameScene';
import Leaderboard from './components/Leaderboard';
import ChatSystem from './components/ChatSystem';
import WeaponSelector from './components/WeaponSelector';

const App: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="xl" sx={{ flex: 1, display: 'flex', gap: 2, py: 2 }}>
        <Box sx={{ flex: 3, position: 'relative' }}>
          <Canvas
            camera={{ position: [0, 5, 10], fov: 75 }}
            style={{ background: '#1a1a1a' }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <GameScene />
            <OrbitControls />
          </Canvas>
          <WeaponSelector />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Leaderboard />
          <ChatSystem />
        </Box>
      </Container>
    </Box>
  );
};

export default App;