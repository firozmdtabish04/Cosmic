import Navbar from "./navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AuthGuard from "./guard/AuthGuard";

// Pages
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import User from "./pages/login/User";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes Group */}
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
