import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// 부유하는 오브젝트 컴포넌트 (찻잔, 시계 대용)
function FloatingObject({ color, position, speed = 1, distort = 0.4 }) {
  return (
    <Float
      speed={speed} // 상시 움직임 속도
      rotationIntensity={1.5} // 회전 강도
      floatIntensity={2} // 위아래 흔들림 강도
    >
      <mesh position={position}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color={color} speed={speed} distort={distort} />
      </mesh>
    </Float>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#ffff00" intensity={2} />
      
      {/* Main Title Text */}
      <Text
        fontSize={1.2}
        font="/fonts/PlayfairDisplay.ttf"
        position={[0, 1, 0]}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        MOUSE PARALLAX{"\n"}Goes to WONDERLAND
      </Text>

      {/* 오브젝트 배치 - 찻잔 위치 */}
      <FloatingObject position={[-4, -2, 0]} color="#555" speed={2} />
      {/* 오브젝트 배치 - 시계 위치 */}
      <FloatingObject position={[4, 3, -2]} color="#8a2be2" speed={1.5} />

      <Rig />
      
    </Canvas>
  );
}

export default App;