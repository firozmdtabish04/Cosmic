import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">Cosmic Watch</h2>
          <p className="mt-3 text-sm">
            Track Near Earth Objects and stay updated with space threats and
            cosmic events.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Connect With Us
          </h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Cosmic Watch. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
