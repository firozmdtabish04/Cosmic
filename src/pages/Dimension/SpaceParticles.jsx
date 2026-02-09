import React from "react";
import Particles from "react-tsparticles";

function SpaceParticles() {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },

        background: {
          color: "transparent",
        },

        particles: {
          number: {
            value: 120,
            density: { enable: true, area: 800 },
          },

          color: { value: "#ffffff" },

          shape: { type: "circle" },

          opacity: {
            value: 0.6,
            random: true,
          },

          size: {
            value: 2,
            random: true,
          },

          move: {
            enable: true,
            speed: 0.2,
          },
        },
      }}
    />
  );
}

export default SpaceParticles;
