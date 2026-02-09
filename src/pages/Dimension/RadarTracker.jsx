import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function RadarRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[3.5, 3.7, 64]} />
      <meshBasicMaterial color="lime" wireframe />
    </mesh>
  );
}

function AsteroidDot({ speed, index }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * (speed / 20000);
    ref.current.position.x = Math.sin(t + index) * 3;
    ref.current.position.z = Math.cos(t + index) * 3;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function RadarTracker({ data }) {
  return (
    <div className="glass-card h-[350px]">
      <h2 className="section-title">3D Radar Tracker</h2>

      <Canvas>
        <ambientLight />
        <pointLight position={[5, 5, 5]} />

        <RadarRing />

        {data.slice(0, 6).map((a, i) => {
          const speed =
            a.close_approach_data?.[0]?.relative_velocity
              ?.kilometers_per_hour || 10000;

          return <AsteroidDot key={a.id} speed={speed} index={i} />;
        })}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
