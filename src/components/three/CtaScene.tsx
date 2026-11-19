import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Crystal() {
  const mesh = useRef<THREE.Mesh>(null);
  const wireGeo = useMemo(() => new THREE.WireframeGeometry(new THREE.OctahedronGeometry(1.35, 0)), []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.3;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <octahedronGeometry args={[1.35, 0]} />
        <meshStandardMaterial color="#161a20" metalness={0.9} roughness={0.25} />
      </mesh>
      <lineSegments geometry={wireGeo}>
        <lineBasicMaterial color="#C5F36B" transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

function Dust({ count = 180 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 11;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
    if (ref.current) ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#C5F36B" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

export default function CtaScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={26} color="#C5F36B" />
      <pointLight position={[-3, -2, 2]} intensity={14} color="#718CFF" />
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1}>
        <Crystal />
      </Float>
      <Dust />
    </Canvas>
  );
}
