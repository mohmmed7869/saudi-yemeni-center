import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const TruckModel = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  return (
    <group ref={group} scale={1.2}>
      {/* Truck Chassis - Soft Matte Silver */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[3.8, 0.15, 1.4]} />
        <meshStandardMaterial color="#E5E7EB" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Main Cabin - Elegant Linen White (Comfortable for the eye) */}
      <mesh position={[-1.2, 0.3, 0]}>
        <boxGeometry args={[1.4, 1.3, 1.4]} />
        <meshStandardMaterial 
          color="#F5F5F7" 
          metalness={0.3} 
          roughness={0.7} 
        />
      </mesh>

      {/* Windows - Midnight Glass */}
      <mesh position={[-1.2, 0.6, 0]} scale={[1.02, 1, 1.02]}>
        <boxGeometry args={[0.9, 0.4, 1.42]} />
        <meshStandardMaterial color="#1D1D1F" metalness={1} roughness={0.1} transparent opacity={0.6} />
      </mesh>

      {/* Cargo Trailer - Muted Charcoal */}
      <mesh position={[1.1, 0.6, 0]}>
        <boxGeometry args={[2.4, 1.9, 1.4]} />
        <meshStandardMaterial color="#1D1D1F" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Wheels - Detailed with subtle accents */}
      {[[-1.4, -0.6, 0.55], [-0.4, -0.6, 0.55], [1, -0.6, 0.55], [1.9, -0.6, 0.55],
        [-1.4, -0.6, -0.55], [-0.4, -0.6, -0.55], [1, -0.6, -0.55], [1.9, -0.6, -0.55]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.32, 0.32, 0.25, 32]} />
            <meshStandardMaterial color="#2C2C2E" roughness={0.9} />
          </mesh>
          <mesh scale={[0.6, 1.1, 0.6]}>
            <cylinderGeometry args={[0.2, 0.2, 0.26, 32]} />
            <meshStandardMaterial color="#D97706" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Front Soft Glowing Lights */}
      <mesh position={[-1.9, 0, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-1.9, 0, -0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

export const Truck3D = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={35} />
        <OrbitControls enableZoom={false} />
        
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={1} color="#ffffff" />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <TruckModel />
          </Float>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={3} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
};
