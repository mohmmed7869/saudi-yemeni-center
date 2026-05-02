import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001 * speed;
      meshRef.current.rotation.y += 0.002 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fbbf24" />
        
        <AnimatedSphere position={[-3, 2, 0]} color="#1e3a8a" speed={0.8} />
        <AnimatedSphere position={[3, -1, -2]} color="#fbbf24" speed={0.6} />
        <AnimatedSphere position={[0, -2, 1]} color="#1e40af" speed={0.5} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
