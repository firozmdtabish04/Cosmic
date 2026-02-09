import React, { useEffect, useState } from "react";
import Earth from "../../assets/earth.svg";
import Astroid from "../../assets/image copy 2.png";
import SpaceParticles from "../../pages/Dimension/SpaceParticles";
import { getTodayAsteroids } from "../../services/nasaApi";
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

      {/* ⭐ Earth Animation */}
      <div className="relative flex justify-center mt-12">
        <img
          src={Earth}
          className="w-[350px] animate-spin-slow drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]"
        />

        <img
          src={Astroid}
          className="absolute w-[70px] top-[10%] right-[25%] animate-bounce"
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
    </div>
  );
}

export default Home;

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
      <h3 className="text-xl">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function AsteroidCard({ asteroid }) {
  const approach = asteroid.close_approach_data[0];

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-6 rounded-xl border border-white/10">
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
