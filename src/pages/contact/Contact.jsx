import React, { useState } from "react";
import SpaceParticles from "../Dimension/SpaceParticles";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import Footer from "../footer/Footer"
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 px-6 text-white relative overflow-hidden">
      <SpaceParticles />

      {/* ⭐ HERO */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Contact Cosmic Watch
        </h1>

        <p className="text-gray-300 mt-4 max-w-xl mx-auto">
          Connect with our space monitoring command center.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
        {/* ⭐ CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="glass-panel p-10 space-y-8 relative"
        >
          <h2 className="text-3xl font-semibold text-center">
            Send Transmission
          </h2>

          {/* Floating Inputs */}
          <div className="floating-group">
            <input required />
            <label>Your Name</label>
          </div>

          <div className="floating-group">
            <input type="email" required />
            <label>Email Address</label>
          </div>

          <div className="floating-group">
            <textarea rows="4" required />
            <label>Your Message</label>
          </div>

          <button className="load-btn w-full py-3">Send Message</button>

          {submitted && (
            <p className="text-green-400 text-center animate-fadeUp">
              🚀 Transmission Sent Successfully!
            </p>
          )}
        </form>

        {/* ⭐ CONTACT INFO */}
        <div className="space-y-8">
          {/* Info Cards */}
          <div className="contact-card">
            <Mail className="text-blue-400" />
            <div>
              <h3>Email</h3>
              <p>support@cosmicwatch.space</p>
            </div>
          </div>

          <div className="contact-card">
            <Phone className="text-purple-400" />
            <div>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="contact-card">
            <MapPin className="text-pink-400" />
            <div>
              <h3>Location</h3>
              <p>Space Research Center, Earth</p>
            </div>
          </div>

          {/* ⭐ SOCIAL LINKS */}
          <div className="glass-panel p-6 flex justify-center gap-8">
            <Github className="social-icon" />
            <Linkedin className="social-icon" />
          </div>

          {/* ⭐ STATS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card text-center">
              24/7
              <p className="text-xs text-gray-400">Monitoring</p>
            </div>

            <div className="stat-card text-center">
              NASA
              <p className="text-xs text-gray-400">Data Source</p>
            </div>

            <div className="stat-card text-center">
              Global
              <p className="text-xs text-gray-400">Coverage</p>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ CTA */}
      <div className="mt-28 text-center">
        <h2 className="text-3xl mb-4">Join The Cosmic Monitoring Network</h2>

        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition shadow-lg">
          Launch Dashboard
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;
