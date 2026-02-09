import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function FloatingCube() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

export default function Service3DPreview() {
  return (
    <div className="w-full h-[250px]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} />
        <FloatingCube />
      </Canvas>
    </div>
  );
}
