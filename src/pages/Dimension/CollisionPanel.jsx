export default function CollisionPanel({ asteroid }) {
  if (!asteroid) return null;

  const velocity =
    asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour;

  const distance = asteroid.close_approach_data[0].miss_distance.kilometers;

  // ⭐ Simple AI Risk Model
  const riskScore = Math.min(
    100,
    (velocity / 50000) * 50 + (1000000 / distance) * 50,
  ).toFixed(1);

  return (
    <div className="bg-white/10 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-3">AI Collision Prediction</h2>

      <p>Velocity: {Math.round(velocity)} km/h</p>
      <p>Distance: {Math.round(distance)} km</p>

      <p className="text-lg mt-3">
        Risk Score:
        <span
          className={`ml-2 font-bold ${
            riskScore > 60 ? "text-red-400" : "text-green-400"
          }`}
        >
          {riskScore}%
        </span>
      </p>
    </div>
  );
}
