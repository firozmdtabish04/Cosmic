import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      login(storedUser);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-xl w-96">
        <h2 className="text-2xl mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 bg-black/40"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-black/40"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 p-2 rounded">Login</button>

        <p className="text-center mt-4">
          New user? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
