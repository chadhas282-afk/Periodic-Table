import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Nucleus({ protons }) {
  const meshRef = useRef();
  const clampedProtons = Math.min(protons, 120);
  const radius = 0.18 + Math.cbrt(clampedProtons) * 0.13;

    useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color="#ff6b35"
          emissive="#ff4400"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>