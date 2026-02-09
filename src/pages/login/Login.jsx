import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock } from "lucide-react";
import ParticlesBackground from "../Dimension/ParticlesBackground";
import CardParticles from "../../card/CardParticles";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      login(storedUser);

      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      navigate("/");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 overflow-hidden">
      {/* Background Particles */}
      <ParticlesBackground />

      {/* Glow Wrapper */}
      <div className="relative z-10 group">
        {/* Glow Border */}
        

        <form
          onSubmit={handleSubmit}
          className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-md overflow-hidden"
        >
          {/* ⭐ Floating Particles INSIDE CARD */}
          <CardParticles />

          {/* Heading */}
          <h2 className="relative z-10 text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome Back 👋
          </h2>

          <p className="relative z-10 text-gray-300 text-center mb-6">
            Login to your account
          </p>

          {error && (
            <p className="relative z-10 bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}

          {/* Email */}
          <div className="relative z-10 mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-black/40 border border-gray-600 focus:border-green-500 focus:outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative z-10 mb-4">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-black/40 border border-gray-600 focus:border-green-500 focus:outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember */}
          <div className="relative z-10 flex items-center justify-between mb-6 text-sm text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-green-500"
              />
              Remember me
            </label>

            <span className="hover:text-green-400 cursor-pointer transition">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button className="relative z-10 w-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition duration-300">
            Login
          </button>

          {/* Signup */}
          <p className="relative z-10 text-center mt-6 text-gray-300">
            New user?{" "}
            <Link
              to="/signup"
              className="text-green-400 hover:text-green-300 font-semibold transition"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
