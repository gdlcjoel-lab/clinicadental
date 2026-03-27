import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';

export const GlassTooth = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <capsuleGeometry args={[0.8, 1.2, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1.0}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={1}
          attenuationDistance={1}
          attenuationColor="#ffffff"
          color="#ffffff"
          roughness={0.1}
          transmission={1}
          ior={1.2}
        />
      </mesh>
    </Float>
  );
};

export const FloatingInstrument = ({ position, rotation, speed }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * speed) * 0.002;
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Stylized instrument handle */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
        <meshPhysicalMaterial
          color="#1D3557"
          roughness={0.3}
          metalness={0.9}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Stylized instrument tip */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhysicalMaterial
          color="#A8DADC"
          roughness={0.1}
          metalness={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

export const Bubble = ({ position, size }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += 0.002;
      if (meshRef.current.position.y > 5) meshRef.current.position.y = -5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        roughness={0}
        transmission={1}
        thickness={0.5}
      />
    </mesh>
  );
};
