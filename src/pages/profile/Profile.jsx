import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "../Dimension/ParticlesBackground";

function Profile() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    joinedAt: "",
    preferences: {
      darkMode: true,
      emailNotifications: true,
    },
  });

  /* Redirect if not logged in */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "Passionate about space & technology 🚀",
        avatar: user.avatar || "",
        phone: user.phone || "",
        location: user.location || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        joinedAt: user.joinedAt || new Date().toDateString(),
        preferences: user.preferences || {
          darkMode: true,
          emailNotifications: true,
        },
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePrefChange = (e) => {
    setForm({
      ...form,
      preferences: {
        ...form.preferences,
        [e.target.name]: e.target.checked,
      },
    });
  };

  /* Avatar Upload */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...form };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    login(updatedUser);
    setEdit(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  /* Profile completion */
  const filledFields = [
    form.name,
    form.bio,
    form.phone,
    form.location,
    form.github,
    form.linkedin,
    form.avatar,
  ].filter(Boolean).length;

  const completion = Math.round((filledFields / 7) * 100);

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 overflow-hidden ">
      <ParticlesBackground />

      <div className="relative z-10 w-full max-w-xl">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-6 rounded-2xl mt-20">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 flex items-center justify-center overflow-hidden">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold">
                  {form.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {edit && (
              <label className="mt-2 text-sm cursor-pointer text-green-400 hover:underline">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            My Profile
          </h2>
          <p className="text-center text-gray-400 mb-4">
            Joined on {form.joinedAt}
          </p>

          {/* Profile Completion */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-1">
              Profile Completion: {completion}%
            </p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* Basic Info */}
          <label className="text-sm text-gray-400">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!edit}
            className={`w-full p-2 mb-3 rounded-lg bg-black/40 border ${
              edit ? "border-gray-600" : "border-transparent"
            }`}
          />

          <label className="text-sm text-gray-400">Email</label>
          <input
            value={form.email}
            disabled
            className="w-full p-2 mb-3 rounded-lg bg-black/30 opacity-70"
          />

          <label className="text-sm text-gray-400">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            disabled={!edit}
            rows={3}
            className={`w-full p-2 mb-4 rounded-lg bg-black/40 border ${
              edit ? "border-gray-600" : "border-transparent"
            }`}
          />

          {/* Extra Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!edit}
              className="p-2 rounded-lg bg-black/40 border border-gray-600"
            />
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              disabled={!edit}
              className="p-2 rounded-lg bg-black/40 border border-gray-600"
            />
          </div>

          {/* Social Links */}
          <input
            name="github"
            placeholder="GitHub URL"
            value={form.github}
            onChange={handleChange}
            disabled={!edit}
            className="w-full p-2 mb-3 rounded-lg bg-black/40 border border-gray-600"
          />

          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={handleChange}
            disabled={!edit}
            className="w-full p-2 mb-6 rounded-lg bg-black/40 border border-gray-600"
          />

          {/* Preferences */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Preferences</p>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="darkMode"
                checked={form.preferences.darkMode}
                onChange={handlePrefChange}
                disabled={!edit}
              />
              Dark Mode
            </label>
            <label className="flex items-center gap-2 text-sm mt-2">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={form.preferences.emailNotifications}
                onChange={handlePrefChange}
                disabled={!edit}
              />
              Email Notifications
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {edit ? (
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-lg font-semibold"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className="flex-1 bg-blue-500/80 py-2 rounded-lg font-semibold"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex-1 bg-red-500/80 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
