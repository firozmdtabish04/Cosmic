import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function AsteroidMesh() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="#8b5e3c" roughness={0.8} />
    </mesh>
  );
}

export default function Asteroid3D() {
  return (
    <div className="w-full h-60">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />
        <AsteroidMesh />
      </Canvas>
    </div>
  );
}
