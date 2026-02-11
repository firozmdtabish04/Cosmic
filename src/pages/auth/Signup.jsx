import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../services/signup";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signupUser({
        email: form.email,
        username: form.username,
        phoneNumber: form.phoneNumber,
        dob: form.dob,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl mb-6 text-center">Create Account 🚀</h2>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          onChange={handleChange}
          required
        />

        {/* Username */}
        <input
          name="username"
          placeholder="Username"
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          onChange={handleChange}
          required
        />

        {/* Phone Number */}
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          onChange={handleChange}
          required
        />

        {/* DOB */}
        <input
          type="date"
          name="dob"
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          onChange={handleChange}
          required
        />

        {/* Confirm Password */}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 bg-gray-800 rounded"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-green-500 py-2 rounded-lg">Signup</button>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-green-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
