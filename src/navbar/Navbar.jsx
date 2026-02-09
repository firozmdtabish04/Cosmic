import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/image copy.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  /* Scroll Effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Prevent Background Scroll When Mobile Menu Opens */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setOpenUserMenu(false);
    navigate("/login");
  };

  const navStyle = `fixed top-0 w-full z-50 transition duration-300 ${
    scrolled
      ? "bg-black/70 backdrop-blur-xl shadow-lg border-b border-white/10"
      : "bg-white/5 backdrop-blur-xl border-b border-white/10"
  }`;

  const linkStyle = ({ isActive }) =>
    `relative font-medium transition group ${
      isActive ? "text-blue-400" : "text-gray-200"
    }`;

  return (
    <nav className={navStyle}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Cosmic Watch Logo"
              className="w-10 h-10 transition duration-500 group-hover:rotate-12 group-hover:scale-110"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cosmic Watch
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <NavLink key={item.name} to={item.path} className={linkStyle}>
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}

            {/* 🔥 USER SECTION */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition font-semibold"
                >
                  {user.name}
                </button>

                {openUserMenu && (
                  <div className="absolute right-0 mt-3 w-40 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg overflow-hidden">
                    <Link
                      to="/profile"
                      onClick={() => setOpenUserMenu(false)}
                      className="block px-4 py-2 text-sm hover:bg-white/10 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black/60 backdrop-blur-xl transition-all duration-500 ${
          isOpen
            ? "max-h-screen py-6 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-5">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-lg text-gray-200 hover:text-blue-400 transition"
            >
              {item.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <span className="text-blue-400 font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
