import React, { useState } from "react";
import Service3DPreview from "../Dimension/Service3DPreview";
import SolarSystemPreview from "../Dimension/SolarSystemPreview";
import SpaceParticles from "../Dimension/SpaceParticles";
import {
  Radar,
  AlertTriangle,
  Satellite,
  Activity,
  Brain,
  Globe,
} from "lucide-react";

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Asteroid Tracking",
      desc: "Real-time NASA NEO tracking with visualization.",
      fullDesc:
        "Cosmic Watch continuously monitors Near Earth Objects using NASA data, providing live tracking dashboards and orbit simulations.",
      badge: "Core Monitoring",
      icon: <Radar size={40} />,
    },
    {
      title: "Hazard Analysis",
      desc: "Analyze asteroid collision risks.",
      fullDesc:
        "Advanced velocity and distance analytics help classify hazardous asteroids and predict impact scenarios.",
      badge: "Safety",
      icon: <AlertTriangle size={40} />,
    },
    {
      title: "Orbit Simulation",
      desc: "3D trajectory visualization.",
      fullDesc:
        "Interactive 3D orbit simulations visualize asteroid movement and orbital mechanics.",
      badge: "Visualization",
      icon: <Satellite size={40} />,
    },
    {
      title: "Real-Time Monitoring",
      desc: "24/7 asteroid monitoring.",
      fullDesc:
        "Continuous cosmic monitoring with real-time alert notifications.",
      badge: "Live System",
      icon: <Activity size={40} />,
    },
    {
      title: "AI Risk Prediction",
      desc: "Machine learning hazard prediction.",
      fullDesc:
        "AI models analyze historical and live trajectory data to estimate threat levels.",
      badge: "AI Powered",
      icon: <Brain size={40} />,
    },
    {
      title: "Global Space Dashboard",
      desc: "Interactive planetary monitoring.",
      fullDesc:
        "Unified dashboard showing planetary data, asteroid belts and analytics.",
      badge: "Analytics",
      icon: <Globe size={40} />,
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 text-white relative overflow-hidden">
      <SpaceParticles />

      {/* ⭐ HERO */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Cosmic Watch Services
        </h1>

        <p className="text-gray-300 mt-4 max-w-xl mx-auto">
          Advanced space monitoring solutions powered by NASA data, AI
          prediction and real-time asteroid tracking.
        </p>
      </div>

      {/* ⭐ SERVICES GRID */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => setSelectedService(service)}
            className="group relative p-6 rounded-2xl cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-400 transition duration-500 hover:-translate-y-2"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl transition"></div>

            {/* Badge */}
            <span className="text-xs px-3 py-1 bg-purple-500/20 rounded-full">
              {service.badge}
            </span>

            {/* Icon */}
            <div className="text-blue-400 mt-4 mb-4 group-hover:rotate-12 transition">
              {service.icon}
            </div>

            <h2 className="text-xl font-semibold text-blue-300">
              {service.title}
            </h2>

            <p className="text-gray-300 mt-2">{service.desc}</p>

            <div className="mt-5 text-sm text-purple-400">View Details →</div>
          </div>
        ))}
      </div>

      {/* ⭐ 3D VISUAL PREVIEW */}
      <div className="mt-32 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6 text-purple-400">
          Service Visualization
        </h2>

        <div className="glass-panel p-6">
          <Service3DPreview />
        </div>
      </div>

      {/* ⭐ SOLAR SYSTEM */}
      <div className="mt-28 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6 text-blue-400">
          Solar System Simulation
        </h2>

        <div className="glass-panel p-6">
          <SolarSystemPreview />
        </div>
      </div>

      {/* ⭐ FUTURISTIC TIMELINE */}
      <div className="mt-32 max-w-4xl mx-auto">
        <h2 className="text-3xl text-center mb-12">Technology Evolution</h2>

        <div className="relative border-l-2 border-blue-400 space-y-10 pl-8">
          {[
            "NASA Data Integration",
            "3D Orbit Visualization",
            "AI Threat Prediction",
            "Global Monitoring Dashboard",
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[34px] w-5 h-5 bg-blue-400 rounded-full group-hover:scale-125 transition"></div>

              <p className="text-gray-300 group-hover:text-white transition">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ CTA */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl mb-4">Explore Cosmic Intelligence</h2>

        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition shadow-lg">
          Launch Dashboard
        </button>
      </div>

      {/* ⭐ MODAL */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="relative max-w-lg w-full p-8 rounded-2xl bg-gray-900 border border-white/10 animate-fadeUp">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-4 text-xl"
            >
              ✕
            </button>

            <div className="text-blue-400 mb-4">{selectedService.icon}</div>

            <h2 className="text-2xl font-bold mb-4">{selectedService.title}</h2>

            <p className="text-gray-300">{selectedService.fullDesc}</p>

            <div className="mt-6 flex justify-between text-sm text-gray-400">
              <span>🚀 Live Monitoring</span>
              <span>🛰 NASA Data Powered</span>
            </div>
          </div>
        </div>
      )}
  
    </div>
  );
}

export default Services;
