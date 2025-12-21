import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Float, Text, Cylinder, Box, Torus } from '@react-three/drei';
import CustomCursor from './CustomCursor';
import MoveButton from './MoveButton';
import './CustomCursor.css';

function Background() {
  const { size } = useThree();
  return (
    <mesh position={[0, 0, -10]} scale={[100, 100, 1]}>
      <planeGeometry />
      <shaderMaterial
        uniforms={{
          uColorTop: { value: new THREE.Color('#000000') },
          uColorBottom: { value: new THREE.Color('#1a0b3a') }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec3 uColorTop;
          uniform vec3 uColorBottom;
          void main() {
            gl_FragColor = vec4(mix(uColorBottom, uColorTop, vUv.y), 1.0);
          }
        `}
      />
    </mesh>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[0, -4, 2]} color="#ffff00" intensity={5} distance={10} />
    </>
  )
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // Increased multiplier for more pronounced parallax
    camera.position.lerp(vec.set(mouse.x * 4, mouse.y * 4, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Asset components from previous steps
function PocketWatch({ position }) {
  return (
    <group position={position}>
      <Cylinder args={[1, 1, 0.3, 64]}>
        <meshStandardMaterial 
          color="#8a2be2" 
          emissive="#8a2be2" // Make it glow
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>
      <Cylinder args={[1.05, 1.05, 0.3, 64]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="white" metalness={0.5} roughness={0.3} />
      </Cylinder>
       <Cylinder args={[1.05, 1.05, 0.3, 64]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="white" metalness={0.5} roughness={0.3} />
      </Cylinder>
      <Box args={[0.2, 0.4, 0.2]} position={[0, 1.2, 0]} >
         <meshStandardMaterial color="gold" metalness={0.8} roughness={0.4} />
      </Box>
    </group>
  );
}

function Teacup({ position }) {
  return (
    <group position={position}>
      <Cylinder args={[0.8, 0.6, 1, 64]}>
        <meshStandardMaterial color="#AAA" metalness={0.2} roughness={0.8} />
      </Cylinder>
      <Torus args={[0.5, 0.1, 16, 100]} position={[0.8, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <meshStandardMaterial color="#AAA" metalness={0.2} roughness={0.8} />
      </Torus>
    </group>
  );
}


function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <MoveButton />
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Lights />
        <Background />
        <Rig />
        
        {/* Main Title */}
        <Text
          fontSize={1.2}
          font="/fonts/PlayfairDisplay.ttf"
          position={[0, 1.5, 0]}
          lineHeight={0.8} // Adjusted line height
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          MOUSE PARALLAX{"\n"}Goes to WONDERLAND
        </Text>

        {/* Body Text */}
        <Text
          fontSize={0.4}
          font="/fonts/PlayfairDisplay.ttf"
          position={[0, -0.5, 0]}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={10}
          textAlign="center"
        >
          Don't be tired, it's a long way to go, but it's a beautiful way.
        </Text>

        {/* Floating Objects */}
        <Float speed={1} rotationIntensity={1} floatIntensity={1.5}>
          <Teacup position={[-3.5, -1, -2]} />
        </Float>
        <Float speed={0.5} rotationIntensity={0.5} floatIntensity={2}>
          <PocketWatch position={[4, 2, -4]} />
        </Float>
        
        <EffectComposer>
          <Bloom 
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9} 
            height={300} 
          />
          <Noise opacity={0.05} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default App;