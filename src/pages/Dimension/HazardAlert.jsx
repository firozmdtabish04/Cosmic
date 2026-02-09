import { useEffect } from "react";

export default function HazardAlert({ asteroids }) {
  useEffect(() => {
    const hazardous = asteroids.filter(
      (a) => a.is_potentially_hazardous_asteroid,
    );

    if (hazardous.length > 0) {
      alert(`⚠️ ${hazardous.length} Hazardous Asteroids Detected!`);
    }
  }, [asteroids]);

  return null;
}
