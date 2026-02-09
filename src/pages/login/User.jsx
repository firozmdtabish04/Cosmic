import { useAuth } from "../../context/AuthContext";

function User() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-black">
      <h1 className="text-3xl mb-4">Welcome {user?.name}</h1>

      <button onClick={logout} className="bg-red-500 px-6 py-2 rounded">
        Logout
      </button>
    </div>
  );
}

export default User;
