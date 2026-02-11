import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "../Dimension/ParticlesBackground";
import { getProfile, updateProfile } from "../../services/profile";

function Profile() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    dob: "",
    joinedDate: "",
    avatar: "",
    bio: "",
    location: "",
    github: "",
    linkedin: "",
  });

  /* ================= FETCH PROFILE FROM DATABASE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        login(data);

        setForm({
          username: data.username || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          dob: data.dob || "",
          joinedDate: data.joinedDate || "",
          avatar: data.avatar || "",
          bio: data.bio || "Passionate about space & technology 🚀",
          location: data.location || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
        });
      } catch (error) {
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  /* ================= FORM CHANGE ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= AVATAR UPLOAD ================= */

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, avatar: reader.result });
    };

    reader.readAsDataURL(file);
  };

  /* ================= SAVE PROFILE ================= */

  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(form);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      login(updatedUser);

      setEdit(false);
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  /* ================= PROFILE COMPLETION ================= */

  const filledFields = [
    form.username,
    form.phoneNumber,
    form.bio,
    form.location,
    form.github,
    form.linkedin,
    form.avatar,
  ].filter(Boolean).length;

  const completion = Math.round((filledFields / 7) * 100);

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 overflow-hidden">
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
                  {form.username?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {edit && (
              <label className="mt-2 text-sm cursor-pointer text-green-400 hover:underline">
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
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
            Joined on {form.joinedDate}
          </p>

          {/* Completion */}
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

          {/* Username */}
          <label className="text-sm text-gray-400">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!edit}
            className="w-full p-2 mb-3 rounded-lg bg-black/40 border border-gray-600"
          />

          {/* Email */}
          <label className="text-sm text-gray-400">Email</label>
          <input
            value={form.email}
            disabled
            className="w-full p-2 mb-3 rounded-lg bg-black/30 opacity-70"
          />

          {/* Phone */}
          <label className="text-sm text-gray-400">Phone</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            disabled={!edit}
            className="w-full p-2 mb-3 rounded-lg bg-black/40 border border-gray-600"
          />

          {/* DOB */}
          <label className="text-sm text-gray-400">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            disabled={!edit}
            className="w-full p-2 mb-4 rounded-lg bg-black/40 border border-gray-600"
          />

          {/* Bio */}
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            disabled={!edit}
            rows={3}
            className="w-full p-2 mb-4 rounded-lg bg-black/40 border border-gray-600"
          />

          {/* Location */}
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            disabled={!edit}
            className="w-full p-2 mb-3 rounded-lg bg-black/40 border border-gray-600"
          />

          {/* Social */}
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
