import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Cylinder, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';
import CustomCursor from './CustomCursor';
import MoveButton from './MoveButton';
import './CustomCursor.css';

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// 회중시계 컴포넌트
function PocketWatch({ position, color }) {
  return (
    <group position={position}>
      <Cylinder args={[1, 1, 0.3, 64]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      <Cylinder args={[1.05, 1.05, 0.3, 64]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="white" />
      </Cylinder>
       <Cylinder args={[1.05, 1.05, 0.3, 64]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="white" />
      </Cylinder>
      <Box args={[0.2, 0.4, 0.2]} position={[0, 1.2, 0]} >
         <meshStandardMaterial color="gold" />
      </Box>
    </group>
  );
}

// 찻잔 컴포넌트
function Teacup({ position, color }) {
  return (
    <group position={position}>
      <Cylinder args={[0.8, 0.6, 1, 64]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      <Torus args={[0.5, 0.1, 16, 100]} position={[0.8, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <meshStandardMaterial color={color} />
      </Torus>
    </group>
  );
}

function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <MoveButton />
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#ffff00" intensity={2} />
        
        <Text
          fontSize={1.0} // Slightly reduced font size
          font="/fonts/PlayfairDisplay.ttf"
          position={[0, 1.5, -1]} // Adjusted position for better composition
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          MOUSE PARALLAX{"\n"}Goes to WONDERLAND
        </Text>

        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Teacup position={[-3, -1.5, 0]} color="#AAA" /> {/* Adjusted position and color */}
        </Float>
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
          <PocketWatch position={[3.5, 2.5, -2]} color="#8a2be2" /> {/* Adjusted position */}
        </Float>

        <Rig />

      </Canvas>
    </div>
  );
}

export default App;