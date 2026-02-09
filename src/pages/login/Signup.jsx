import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password must be 6+ characters");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    alert("Signup Successful");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-xl w-96">

        <h2 className="text-2xl mb-6 text-center">Signup</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-4 bg-black/40"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 bg-black/40"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-black/40"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-500 p-2 rounded">
          Signup
        </button>

        <p className="text-center mt-4">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
