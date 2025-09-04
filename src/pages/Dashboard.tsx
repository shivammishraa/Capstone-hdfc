import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; 
import Navbar from "../components/Dashboard/Navbar.tsx";
import useSessionTimeout from "../hooks/useSessionTimeout"; 

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useSessionTimeout(10000);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">My Dashboard</div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-200">
            Home
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-200">
            Analytics
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-200">
            Settings
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

     
      <main className="flex-1 p-6">
       
        <div className="flex items-center space-x-4">
          <Navbar />
        </div>

     
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">Card 1</div>
          <div className="bg-white p-6 rounded-xl shadow">Card 2</div>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          ⚡ You will be logged out automatically after 10s of inactivity.
        </p>
      </main>
    </div>
  );
}
