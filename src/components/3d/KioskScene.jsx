import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Kiosk = () => {
  const group = useRef();
  
  // Interactive rotation towards mouse pointer
  useFrame((state) => {
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 16;
    
    // Auto rotation + mouse interaction lerp
    const autoRotate = state.clock.getElapsedTime() * 0.1;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX + autoRotate, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Main Body */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 3, 0.6]} />
        <meshStandardMaterial color="#1a202c" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Screen Glowing */}
      <mesh position={[0, 2, 0.31]}>
        <planeGeometry args={[0.9, 1.2]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#2DD4BF" 
          emissiveIntensity={1.5} 
          toneMapped={false} 
        />
      </mesh>
      
      {/* Screen overlay (simulating UI grid/lines) */}
      <mesh position={[0, 2, 0.311]}>
        <planeGeometry args={[0.8, 1.1]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.1}
        />
      </mesh>

      {/* Charging Cable */}
      <mesh position={[0.65, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      
      {/* Connector Plug */}
      <mesh position={[0.65, 0.4, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#111" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Glowing Accent Strip */}
      <mesh position={[0, 0.2, 0.31]}>
        <boxGeometry args={[0.4, 0.05, 0.01]} />
        <meshStandardMaterial emissive="#4ADE80" emissiveIntensity={2} color="#000" toneMapped={false} />
      </mesh>
    </group>
  );
};

const KioskScene = () => {
  return (
    <>
      <ambientLight intensity={0.2} color="#2DD4BF" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4ADE80" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#2DD4BF" />
      
      <Float
        speed={2} 
        rotationIntensity={0.1} 
        floatIntensity={0.5} 
        floatingRange={[-0.1, 0.1]}
      >
        <Kiosk />
      </Float>

      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={4} 
        color="#000" 
      />
      <Environment preset="city" />
    </>
  );
};

export default KioskScene;
