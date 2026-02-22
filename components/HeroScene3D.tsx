"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Floating distorted sphere — follows mouse 360° ── */
function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(({ mouse, clock }) => {
    if (!meshRef.current) return;

    // Map mouse position to full 360° rotation
    targetRotation.current.y = mouse.x * Math.PI;  // -π to +π (full 360°)
    targetRotation.current.x = -mouse.y * Math.PI;  // -π to +π (full 360°)

    // Smooth interpolation toward target
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.05;

    // Gentle idle spin when mouse is centered
    meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.08;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

/* ── Orbiting ring ── */
function OrbitalRing({
  radius,
  speed,
  color,
  reverse = false,
}: {
  radius: number;
  speed: number;
  color: string;
  reverse?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
      );
    }
    return pts;
  }, [radius]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const dir = reverse ? -1 : 1;
      groupRef.current.rotation.y = clock.getElapsedTime() * speed * dir;
      groupRef.current.rotation.x = 0.5;
      groupRef.current.rotation.z = reverse ? 0.3 : -0.2;
    }
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <group ref={groupRef}>
      <line>
        <bufferGeometry attach="geometry" {...lineGeometry} />
        <lineBasicMaterial
          attach="material"
          color={color}
          transparent
          opacity={0.3}
          linewidth={1}
        />
      </line>
    </group>
  );
}

/* ── Floating small particles (nodes) ── */
function FloatingNodes({ count = 30 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(() => {
    const temp: { position: THREE.Vector3; speed: number; offset: number }[] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 2.5;
      temp.push({
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    particles.forEach((p, i) => {
      const t = clock.getElapsedTime() * p.speed + p.offset;
      dummy.position.set(
        p.position.x + Math.sin(t) * 0.3,
        p.position.y + Math.cos(t * 0.7) * 0.3,
        p.position.z + Math.sin(t * 0.5) * 0.2
      );
      const scale = 0.03 + Math.sin(t * 2) * 0.015;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.8} />
    </instancedMesh>
  );
}

/* ── Connection lines between nodes ── */
function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3; speed: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const r1 = 1.5 + Math.random() * 2;
      const r2 = 1.5 + Math.random() * 2;
      const a1 = Math.random() * Math.PI * 2;
      const a2 = Math.random() * Math.PI * 2;
      result.push({
        start: new THREE.Vector3(
          Math.cos(a1) * r1,
          (Math.random() - 0.5) * 2,
          Math.sin(a1) * r1
        ),
        end: new THREE.Vector3(
          Math.cos(a2) * r2,
          (Math.random() - 0.5) * 2,
          Math.sin(a2) * r2
        ),
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    return result;
  }, []);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    linesRef.current.children.forEach((child, i) => {
      const line = lines[i];
      const t = clock.getElapsedTime() * line.speed;
      const opacity = (Math.sin(t) + 1) * 0.15;
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      mat.opacity = opacity;
    });
  });

  return (
    <group ref={linesRef}>
      {lines.map((l, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([l.start, l.end]);
        return (
          <line key={i}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial
              attach="material"
              color="#06b6d4"
              transparent
              opacity={0.2}
            />
          </line>
        );
      })}
    </group>
  );
}

/* ── Main Scene ── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (mouse.x * 0.25 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x +=
        (-mouse.y * 0.2 - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient & point lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#a855f7" />
      <pointLight position={[0, 3, -5]} intensity={0.4} color="#3b82f6" />

      {/* Central orb */}
      <CoreOrb />

      {/* Orbital rings */}
      <OrbitalRing radius={2.5} speed={0.3} color="#06b6d4" />
      <OrbitalRing radius={3.2} speed={0.2} color="#a855f7" reverse />
      <OrbitalRing radius={3.8} speed={0.15} color="#3b82f6" />

      {/* Floating node particles */}
      <FloatingNodes count={35} />

      {/* Connection lines */}
      <ConnectionLines />

      {/* Sparkle particles */}
      <Sparkles
        count={80}
        scale={8}
        size={1.5}
        speed={0.4}
        color="#06b6d4"
        opacity={0.5}
      />
      <Sparkles
        count={40}
        scale={6}
        size={1}
        speed={0.3}
        color="#a855f7"
        opacity={0.3}
      />
    </group>
  );
}

/* ── Exported Canvas Component ── */
export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
