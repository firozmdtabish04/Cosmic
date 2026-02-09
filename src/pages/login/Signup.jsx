import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import ParticlesBackground from "../Dimension/ParticlesBackground";
import CardParticles from "../../card/CardParticles";

function Signup() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  /* Password strength */
  const getStrength = (pass) => {
    if (pass.length < 6) return "Weak";
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/)) return "Strong";
    return "Medium";
  };

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Confirm password */
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    /* Password length */
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    /* Prevent duplicate email */
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === form.email) {
      setError("Email already registered");
      return;
    }

    /* Create full user object */
    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      bio: "New Cosmic Explorer 🚀",
      avatar: "",
      joinedAt: new Date().toDateString(),
      preferences: {
        darkMode: true,
        emailNotifications: true,
      },
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 overflow-hidden">
      
      <ParticlesBackground />

      <div className="relative z-10 group">

        <form
          onSubmit={handleSubmit}
          className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-md overflow-hidden"
        >
          <CardParticles />

          {/* Heading */}
          <h2 className="relative z-10 text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Create Account 🚀
          </h2>

          <p className="relative z-10 text-gray-300 text-center mb-6">
            Join Cosmic Watch
          </p>

          {/* Error */}
          {error && (
            <p className="relative z-10 bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}

          {/* Name */}
          <div className="relative z-10 mb-4">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="name"
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-black/40 border border-gray-600 focus:border-green-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative z-10 mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-black/40 border border-gray-600 focus:border-green-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative z-10 mb-2">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-black/40 border border-gray-600 focus:border-green-500 outline-none"
              onChange={handleChange}
              required
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Password Strength */}
          <p
            className={`text-sm mb-4 ${
              strength === "Strong"
                ? "text-green-400"
                : strength === "Medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            Strength: {strength}
          </p>

          {/* Confirm Password */}
          <div className="relative z-10 mb-6">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 py-2 rounded-lg bg-black/40 border border-gray-600 focus:border-green-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Signup Button */}
          <button className="relative z-10 w-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition">
            Signup
          </button>

          {/* Login Link */}
          <p className="relative z-10 text-center mt-6 text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-400 hover:text-green-300 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
