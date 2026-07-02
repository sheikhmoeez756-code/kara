"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function ParticleField({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 1400;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute points through a spherical shell for a sense of depth.
      const r = 5 + Math.random() * 11;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += delta * 0.035;
    ref.current.rotation.x += delta * 0.008;
    // Gentle parallax toward the pointer.
    const { x, y } = state.pointer;
    ref.current.position.x += (x * 0.6 - ref.current.position.x) * 0.03;
    ref.current.position.y += (y * 0.4 - ref.current.position.y) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#E6FF00"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeBackground() {
  const reduced = !!useReducedMotion();
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 14], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <ParticleField reduced={reduced} />
    </Canvas>
  );
}
