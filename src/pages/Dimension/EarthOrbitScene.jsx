import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import earthTexture from "../../assets/earth.svg"; // ⭐ Use PNG/JPG instead

/* ⭐ Earth Component */
function Earth() {
  const ref = useRef();
  const texture = useTexture(earthTexture);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <Sphere ref={ref} args={[2, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

/* ⭐ Orbit Asteroid */
function OrbitAsteroid({ selected }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();

    // ⭐ Faster orbit if selected
    const speed = selected ? 2 : 1;

    ref.current.position.x = Math.cos(t * speed) * 4;
    ref.current.position.z = Math.sin(t * speed) * 4;

    // ⭐ Slight spin animation
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.5, 1]} />

      <meshStandardMaterial
        color={selected ? "#ff4d4d" : "#8b5e3c"}
        emissive={selected ? "#ff0000" : "#000000"}
        emissiveIntensity={selected ? 0.6 : 0}
      />
    </mesh>
  );
}

/* ⭐ Scene Export */
export default function EarthOrbitScene({ selectedAsteroid }) {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 2, 7] }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        {/* Earth */}
        <Earth />

        {/* Asteroid */}
        <OrbitAsteroid selected={selectedAsteroid} />
      </Canvas>
    </div>
  );
}
