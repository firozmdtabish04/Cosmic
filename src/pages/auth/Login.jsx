import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { loginUser } from "../../services/login";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Restore remembered email */
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({
        email,
        password,
      });

      if (!res?.token) {
        throw new Error("Invalid server response");
      }

      /* ===== Prepare User Object ===== */

      const userData = {
        email: res.email,
        username: res.username,
        phoneNumber: res.phoneNumber,
        dob: res.dob,
        joinedDate: res.joinedDate,
      };

      /* ✅ Save through AuthContext ONLY */
      login(userData, res.token);

      /* ===== Remember Email ===== */

      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl w-96">
        <h2 className="text-2xl mb-6 text-center">Login</h2>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Remember Me */}
        <label className="flex gap-2 mb-4">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-green-500 py-2 rounded font-semibold hover:bg-green-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          New user?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
