import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EarthOrbitScene from "../Dimension/EarthOrbitScene";
import SpaceParticles from "../Dimension/SpaceParticles";
import Footer from "../footer/Footer"
function About() {
  const apiKey = import.meta.env.VITE_NASA_API_KEY;

  const [date, setDate] = useState(new Date());
  const [asteroids, setAsteroids] = useState([]);
  const [monthAsteroids, setMonthAsteroids] = useState({});
  const [page, setPage] = useState(0);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5;

  const formatDate = (d) => d.toISOString().split("T")[0];

  // ⭐ Fetch Entire Month Data (for calendar highlight)
  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDate(
            start,
          )}&end_date=${formatDate(end)}&api_key=${apiKey}`,
        );

        const data = await res.json();
        setMonthAsteroids(data.near_earth_objects || {});
      } catch (err) {
        console.log(err);
      }
    };

    fetchMonthData();
  }, [date]);

  // ⭐ Fetch Selected Date Asteroids
  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        setLoading(true);

        const selected = formatDate(date);

        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${selected}&end_date=${selected}&api_key=${apiKey}`,
        );

        const data = await res.json();
        const list = Object.values(data.near_earth_objects)[0] || [];

        setAsteroids(list);
        setPage(0);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchAsteroids();
  }, [date]);

  // ⭐ Highlight Hazard Dates
  const hazardCheck = (tileDate) => {
    const formatted = formatDate(tileDate);

    const list = monthAsteroids[formatted] || [];

    return list.some((ast) => ast.is_potentially_hazardous_asteroid);
  };

  const displayed = asteroids.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage,
  );

  return (
    <div className="min-h-screen pt-24 px-8 relative text-white">
      <SpaceParticles />

      {/* ⭐ HERO */}
      <div className="text-center mb-14 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Cosmic Watch Asteroid Monitoring
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT PANEL */}
        <div className="glass-panel p-6 flex flex-col items-center">
          <h2 className="panel-title">📅 Asteroid Date Selection</h2>

          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date }) =>
              hazardCheck(date) ? "hazard-date" : null
            }
          />

          <p className="mt-4">Selected: {formatDate(date)}</p>
        </div>

        {/* CENTER */}
        <div className="glass-panel flex flex-col justify-center items-center p-4 min-h-[450px]">
          <EarthOrbitScene selectedAsteroid={selectedAsteroid} />
        </div>

        {/* RIGHT */}
        <div className="glass-panel p-6 flex flex-col">
          <h2 className="panel-title">☄ Live Asteroids</h2>

          {loading && <p>Loading Asteroids...</p>}

          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
            {displayed.map((ast) => {
              const approach = ast.close_approach_data[0];

              return (
                <div
                  key={ast.id}
                  onClick={() => setSelectedAsteroid(ast)}
                  className="asteroid-card cursor-pointer"
                >
                  <h3 className="text-blue-300">{ast.name}</h3>

                  <p>📅 {approach.close_approach_date}</p>

                  <p>
                    🚀{" "}
                    {Math.round(approach.relative_velocity.kilometers_per_hour)}{" "}
                    km/h
                  </p>

                  <p>🌍 {Math.round(approach.miss_distance.kilometers)} km</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="load-btn"
            >
              Prev
            </button>

            <button
              disabled={(page + 1) * itemsPerPage >= asteroids.length}
              onClick={() => setPage(page + 1)}
              className="load-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
}

export default About;
