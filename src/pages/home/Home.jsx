import React, { useEffect, useState } from "react";
import Earth from "../../assets/earth.svg";
import Astroid from "../../assets/image copy 2.png";
import SpaceParticles from "../../pages/Dimension/SpaceParticles";
import { getTodayAsteroids } from "../../services/api/nasaApi";

function Home() {
  const [asteroids, setAsteroids] = useState([]);
  const [hazardCount, setHazardCount] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodayAsteroids();
      const todayData = data[today] || [];

      setAsteroids(todayData);

      const hazardous = todayData.filter(
        (a) => a.is_potentially_hazardous_asteroid,
      );

      setHazardCount(hazardous.length);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen text-white px-6 pt-24 relative">
      <SpaceParticles />

      {/* ⭐ Header */}
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Cosmic Watch Live Dashboard
      </h1>

      <p className="text-lg font-semibold text-center bg-gradient-to-r from-blue-400 to-red-600 bg-clip-text text-transparent">
        Developed by Tabish Firoz
      </p>

      {/* ⭐ Earth Animation */}
      <div className="relative flex justify-center mt-12">
        <img
          src={Earth}
          className="w-[350px] animate-spin-slow drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]"
          alt="Earth"
        />

        <img
          src={Astroid}
          className="absolute w-[70px] top-[10%] right-[25%] animate-bounce"
          alt="Asteroid"
        />
      </div>

      {/* ⭐ Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
        <StatCard title="Total Objects" value={asteroids.length} />
        <StatCard title="Hazardous" value={hazardCount} />
        <StatCard title="Safe Objects" value={asteroids.length - hazardCount} />
      </div>

      {/* ⭐ Asteroid List */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Today's Asteroids</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {asteroids.slice(0, 6).map((a) => (
            <AsteroidCard key={a.id} asteroid={a} />
          ))}
        </div>
      </div>

      {/* ⭐ INFO SECTION */}
      <div className="max-w-6xl mx-auto mt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-10">
          {/* NASA INFO */}
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-xl border border-white/10 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              About NASA Interstellar Asteroids
            </h3>

            <p className="text-gray-300 leading-relaxed">
              NASA monitors Near-Earth Objects (NEOs) and interstellar asteroids
              to protect our planet from potential impact threats. These
              celestial bodies travel through space at extremely high speeds and
              sometimes pass close to Earth.
            </p>

            <p className="text-gray-300 mt-4 leading-relaxed">
              Through advanced telescopes, satellites, and predictive modeling,
              NASA continuously tracks asteroid movement and identifies
              potentially hazardous objects to ensure planetary safety.
            </p>
          </div>

          {/* WEBSITE INFO */}
          <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 p-6 rounded-xl border border-white/10 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-400">
              About Cosmic Watch
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Cosmic Watch is an interactive space monitoring dashboard designed
              to visualize real-time asteroid data using NASA's public API. The
              platform helps users understand asteroid movement, hazard levels,
              and cosmic activity in a visually engaging format.
            </p>

            <p className="text-gray-300 mt-4 leading-relaxed">
              Built using modern web technologies like React, Tailwind CSS, and
              API integration, Cosmic Watch aims to educate and inspire space
              enthusiasts and developers alike.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

/* ⭐ Stat Card */
function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
      <h3 className="text-xl">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

/* ⭐ Asteroid Card */
function AsteroidCard({ asteroid }) {
  const approach = asteroid.close_approach_data[0];

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-6 rounded-xl border border-white/10 hover:scale-105 transition">
      <h3 className="text-xl font-semibold">{asteroid.name}</h3>

      <p className="text-gray-300 mt-2">
        Speed: {Math.round(approach.relative_velocity.kilometers_per_hour)} km/h
      </p>

      <p className="text-gray-300">
        Miss Distance: {Math.round(approach.miss_distance.kilometers)} km
      </p>

      <p
        className={`mt-2 font-semibold ${
          asteroid.is_potentially_hazardous_asteroid
            ? "text-red-400"
            : "text-green-400"
        }`}
      >
        {asteroid.is_potentially_hazardous_asteroid
          ? "⚠️ Hazardous"
          : "✅ Safe"}
      </p>
    </div>
  );
}
