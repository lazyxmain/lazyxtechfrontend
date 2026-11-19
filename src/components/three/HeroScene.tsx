import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* Icosahedron wireframe core with soft inner glow */
function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.15, 1), []);
  const wireGeo = useMemo(() => new THREE.WireframeGeometry(geo), [geo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      const s = 1 + Math.sin(t * 1.4) * 0.015;
      mesh.current.scale.setScalar(s);
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.07;
      wire.current.rotation.z = Math.cos(t * 0.22) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={mesh} geometry={geo}>
        <meshStandardMaterial
          color="#171b21"
          metalness={0.85}
          roughness={0.3}
          emissive={new THREE.Color('#0e1410')}
        />
      </mesh>
      <lineSegments ref={wire} geometry={wireGeo}>
        <lineBasicMaterial color="#C5F36B" transparent opacity={0.55} />
      </lineSegments>
      <mesh scale={1.02}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#C5F36B" transparent opacity={0.04} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* Orbiting ring drawn as a line loop */
function OrbitRing({
  radius,
  tilt,
  speed,
  color,
  opacity,
}: {
  radius: number;
  tilt: number;
  speed: number;
  color: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });

  return (
    <group ref={ref} rotation={[tilt, 0, tilt * 0.4]}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </line>
      <Spark r={radius} speed={speed * 3} color={color} />
    </group>
  );
}

function Spark({ r, speed, color }: { r: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const a = state.clock.elapsedTime * speed;
    ref.current.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

/* Ambient particle field */
function Particles({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#9A9DA5" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* Floating translucent UI panels */
function Panels() {
  const ring = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ring.current) {
      ring.current.rotation.y += delta * 0.1;
      ring.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });
  return (
    <group ref={ring} rotation={[0.35, 0, 0]}>
      {[
        { pos: [2.4, 0.7, -0.6] as const, rot: [0.1, -0.6, 0.06] as const, w: 0.95, h: 0.6 },
        { pos: [-2.5, -0.4, 0.3] as const, rot: [0.08, 0.7, -0.05] as const, w: 0.8, h: 0.5 },
        { pos: [1.9, -1.3, 0.9] as const, rot: [-0.12, -0.4, 0.1] as const, w: 0.6, h: 0.38 },
      ].map((p, i) => (
        <group key={i} position={p.pos as unknown as [number, number, number]} rotation={p.rot as unknown as [number, number, number]}>
          <mesh>
            <planeGeometry args={[p.w, p.h]} />
            <meshBasicMaterial color="#718CFF" transparent opacity={0.05} side={THREE.DoubleSide} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(p.w, p.h)]} />
            <lineBasicMaterial color={i === 1 ? '#C5F36B' : '#718CFF'} transparent opacity={0.5} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

/* Mouse parallax rig */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.28 - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (-y * 0.18 - group.current.rotation.x) * 0.045;
  });
  return <group ref={group}>{children}</group>;
}

/* Visible-region gate: only render frames while on screen */
function Scene() {
  const [visible, setVisible] = useState(false);

  const setRef = (node: HTMLDivElement | null) => {
    if (!node || visible) return;
    const obs = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), {
      rootMargin: '100px',
    });
    obs.observe(node);
  };

  return (
    <div ref={setRef} className="absolute inset-0">
      {visible && (
        <Canvas
          frameloop={visible ? 'always' : 'demand'}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0.2, 6.2], fov: 42 }}
        >
          <ambientLight intensity={0.35} />
          <pointLight position={[4, 3, 4]} intensity={30} color="#C5F36B" />
          <pointLight position={[-4, -2, 2]} intensity={18} color="#718CFF" />
          <Rig>
            <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.9}>
              <Core />
              <OrbitRing radius={1.9} tilt={1.15} speed={0.25} color="#C5F36B" opacity={0.35} />
              <OrbitRing radius={2.45} tilt={1.45} speed={-0.16} color="#718CFF" opacity={0.25} />
              <Panels />
            </Float>
            <Particles />
          </Rig>
        </Canvas>
      )}
    </div>
  );
}

/* Lazily mount the 3D scene after first paint */
export default function HeroSceneLazy() {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMount(true), 50);
    return () => clearTimeout(t);
  }, []);
  if (!mount) return null;
  return <Scene />;
}
