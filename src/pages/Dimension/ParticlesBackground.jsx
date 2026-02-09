import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 60 },
          color: { value: "#22c55e" },
          opacity: { value: 0.3 },
          size: { value: 2 },
          links: {
            enable: true,
            color: "#22c55e",
            opacity: 0.2,
          },
          move: { enable: true, speed: 0.5 },
        },
      }}
      className="absolute inset-0"
    />
  );
}

export default ParticlesBackground;
