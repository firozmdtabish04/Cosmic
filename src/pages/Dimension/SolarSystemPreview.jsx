import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Planet({ color, radius, distance, speed }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.cos(t * speed) * distance;
    ref.current.position.z = Math.sin(t * speed) * distance;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function SolarSystemPreview() {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        {/* Sun */}
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial emissive="orange" color="yellow" />
        </mesh>

        <Planet color="blue" radius={0.5} distance={4} speed={0.5} />
        <Planet color="red" radius={0.4} distance={6} speed={0.3} />
      </Canvas>
    </div>
  );
}
