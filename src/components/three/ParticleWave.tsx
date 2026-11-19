import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLS = 90;
const ROWS = 45;
const SEP = 0.28;

/* An ocean of light: a waving particle grid that swells around the cursor */
function Wave() {
  const ref = useRef<THREE.Points>(null);

  const base = useMemo(() => {
    const arr = new Float32Array(COLS * ROWS * 3);
    let k = 0;
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        arr[k++] = (i - COLS / 2) * SEP;
        arr[k++] = 0;
        arr[k++] = (j - ROWS / 2) * SEP;
      }
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(COLS * ROWS * 3);
    const lime = new THREE.Color('#C5F36B');
    const volt = new THREE.Color('#718CFF');
    let k = 0;
    for (let i = 0; i < COLS; i++) {
      const c = volt.clone().lerp(lime, i / COLS);
      for (let j = 0; j < ROWS; j++) {
        arr[k++] = c.r;
        arr[k++] = c.g;
        arr[k++] = c.b;
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x * 2.6;
    const pz = state.pointer.y * 1.8;
    const geo = ref.current?.geometry;
    const attr = geo?.attributes.position as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const a = attr.array as Float32Array;
    for (let i = 0; i < a.length; i += 3) {
      const x = a[i];
      const z = a[i + 2];
      const dx = x - px;
      const dz = z - pz;
      const d2 = dx * dx + dz * dz;
      const swell = Math.exp(-d2 * 0.09) * 1.15;
      a[i + 1] =
        Math.sin(x * 0.55 + t * 1.1) * 0.3 +
        Math.cos(z * 0.7 + t * 0.8) * 0.26 +
        swell;
    }
    attr.needsUpdate = true;
    if (ref.current) ref.current.rotation.y = Math.sin(t * 0.08) * 0.12;
  });

  return (
    <points ref={ref} rotation={[0.42, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[base.slice(), 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* Only render while on screen */
export default function ParticleWaveLazy() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const setRef = (node: HTMLDivElement | null) => {
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => setVisible(entries[0].isIntersecting),
      { rootMargin: '120px' }
    );
    obs.observe(node);
  };

  if (!mounted) return null;

  return (
    <div ref={setRef} className="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          camera={{ position: [0, 3.4, 4.6], fov: 50 }}
        >
          <Wave />
        </Canvas>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_40%,var(--c-bg-soft)_100%)]" />
    </div>
  );
}
