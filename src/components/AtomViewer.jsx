import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Nucleus({ protons }) {
  const meshRef = useRef();
  const clampedProtons = Math.min(protons, 120);
  const radius = 0.18 + Math.cbrt(clampedProtons) * 0.13;
