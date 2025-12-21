import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Float, Text, Cylinder, Box, Torus } from '@react-three/drei';
import CustomCursor from './CustomCursor';
import MoveButton from './MoveButton';
import './CustomCursor.css';


// 1. Enhanced Background with moving noise
function DeepWonderlandBackground() {
    const uniforms = useMemo(() => ({
      uColorTop: { value: new THREE.Color('#000000') },
      uColorBottom: { value: new THREE.Color('#100821') },
      uTime: { value: 0 }
    }), [])
  
    useFrame((state) => {
      uniforms.uTime.value = state.clock.getElapsedTime() * 0.05;
    })
  
    return (
      <mesh scale={[100, 100, 1]} position={[0, 0, -15]}>
        <planeGeometry />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColorTop;
            uniform vec3 uColorBottom;
            uniform float uTime;
            varying vec2 vUv;

            float random(vec2 st) {
              return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            void main() {
              vec3 color = mix(uColorBottom, uColorTop, vUv.y);
              float noise = random(vUv + uTime * 0.01) * 0.03;
              color += noise;
              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>
    )
}

// 2. Reusable Emissive Text component
function EmissiveText({ children, emissiveIntensity = 2.5, ...props }) {
  return (
    <Text
      {...props}
      font="/fonts/PlayfairDisplay.ttf"
      anchorX="center"
      anchorY="middle"
    >
      {children}
      <meshStandardMaterial 
        color="white" 
        emissive="white" 
        emissiveIntensity={emissiveIntensity}
        toneMapped={false}
      />
    </Text>
  )
}

// All other components remain the same
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
    camera.position.lerp(vec.set(mouse.x * 4, mouse.y * 4, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function PocketWatch({ position }) {
  return (
    <group position={position}>
      <Cylinder args={[1, 1, 0.3, 64]}>
        <meshStandardMaterial color="#8a2be2" emissive="#8a2be2" emissiveIntensity={2} metalness={0.8} roughness={0.2} />
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
      <Canvas 
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ReinhardToneMapping,
        }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <Lights />
        <DeepWonderlandBackground />
        <Rig />
        
        {/* Main Title with floating animation */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <EmissiveText fontSize={1.2} position={[0, 1.5, 0]} lineHeight={0.8}>
            MOUSE PARALLAX{"\n"}Goes to WONDERLAND
          </EmissiveText>
        </Float>

        {/* Body Text with floating animation */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <EmissiveText fontSize={0.35} position={[0, -0.6, 0]} maxWidth={6} textAlign="center" lineHeight={1.5} emissiveIntensity={0.5}>
            {"Don't be tired, it's a long way to go,\nbut it's a beautiful way."}
          </EmissiveText>
        </Float>

        {/* Floating Objects */}
        <Float speed={1} rotationIntensity={1} floatIntensity={1.5}>
          <Teacup position={[-3.5, -1, -2]} />
        </Float>
        <Float speed={0.5} rotationIntensity={0.5} floatIntensity={2}>
          <PocketWatch position={[4, 2, -4]} />
        </Float>
        
        <EffectComposer disableNormalPass>
          <Bloom 
            intensity={1.8}
            luminanceThreshold={0.5} 
            luminanceSmoothing={0.9} 
            mipmapBlur              
          />
          <Noise opacity={0.05} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default App;