import { type MutableRefObject, useMemo, useRef } from 'react';
import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group, Points as PointsType } from 'three';

interface ParticleFieldProps {
  count?: number;
  mouse: MutableRefObject<{ x: number; y: number }>;
}

const ParticleField = ({ count = 2000, mouse }: ParticleFieldProps) => {
  const ref = useRef<PointsType>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.02 + mouse.current.y * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03 + mouse.current.x * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

const NeuralConnections = ({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) => {
  const groupRef = useRef<Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = mouse.current.x * 0.15;
    groupRef.current.rotation.x = mouse.current.y * 0.08;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.scale, 8, 8]} />
          <meshBasicMaterial color="#a5b4fc" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

interface HeroSceneProps {
  mouseRef: MutableRefObject<{ x: number; y: number }>;
}

export const HeroScene = ({ mouseRef }: HeroSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.2} />
      <ParticleField mouse={mouseRef} />
      <NeuralConnections mouse={mouseRef} />
    </Canvas>
  );
}
