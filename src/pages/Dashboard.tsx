
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import Navbar from "../components/Dashboard/Navbar.tsx";
import useSessionTimeout from "../hooks/useSessionTimeout";
import { useState } from "react";
import { fetchAllUsers } from "..//services/authService.ts"; // adjust path

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useSessionTimeout(100000000);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    navigate("/");
  };

  const handleFetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">My Dashboard</div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-200">Home</a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-200">Analytics</a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-200">Settings</a>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center space-x-4">
          <Navbar />
        </div>

        {/* Fetch Users Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Users</h2>
          <button
            onClick={handleFetchUsers}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Users"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {users.length > 0 && (
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              {users.map((user, idx) => (
                <li key={idx}>{JSON.stringify(user)}</li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          ⚡ You will be logged out automatically after 10s of inactivity.
        </p>
      </main>
    </div>
  );
}
