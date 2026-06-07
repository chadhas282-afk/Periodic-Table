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
       <mesh>
        <sphereGeometry args={[radius * 1.3, 16, 16]} />
        <meshStandardMaterial
          color="#ff8c42"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      {Array.from({ length: Math.min(protons, 8) }).map((_, i) => {
        const angle = (i / Math.min(protons, 8)) * Math.PI * 2;
        const r = radius * 1.7;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#ff4444" emissive="#ff2222" emissiveIntensity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

function ElectronOrbit({ shellIndex, electronCount, totalShells }) {
  const orbitRef = useRef();
  const electronsRef = useRef([]);

  const orbitRadius = 1.1 + shellIndex * 0.95;
  const speed = 0.9 - shellIndex * 0.12;

  useFrame((state) => {
    electronsRef.current.forEach((electronRef, i) => {
      if (!electronRef) return;
      const angle = state.clock.elapsedTime * speed + (i / electronCount) * Math.PI * 2;
      electronRef.position.x = Math.cos(angle) * orbitRadius;
      electronRef.position.y = Math.sin(angle) * orbitRadius;
      electronRef.position.z = 0;
    });
  });

  const shellColors = ['#60a5fa', '#34d399', '#a78bfa', '#f472b6', '#fb923c', '#facc15', '#22d3ee'];
  const color = shellColors[shellIndex % shellColors.length];

  const orbitPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * orbitRadius,
        0,
      ));
    }
    return pts;
  }, [orbitRadius]);