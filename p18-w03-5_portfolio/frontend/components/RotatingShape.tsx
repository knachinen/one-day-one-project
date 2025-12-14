"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface RotatingShapeProps {
  color?: string;
}

function Box(props: JSX.IntrinsicElements['mesh']) {
  const meshRef = useRef<Mesh>(null!);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || 'hotpink'} />
    </mesh>
  );
}

const RotatingShape: React.FC<RotatingShapeProps> = ({ color }) => {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box color={color} />
    </Canvas>
  );
};

export default RotatingShape;
