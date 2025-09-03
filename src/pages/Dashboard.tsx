import Navbar from "../components/Dashboard/Navbar.tsx"

// export default function Dashboard() {
//   return (

//     <>
//       <Navbar />
//     </>
//   )
// }

import React from "react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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
        <button className="m-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Profile Section */}
        <div className=" flex items-center space-x-4">
          {/* <img
            src="https://via.placeholder.com/80"
            alt="profile"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Software Engineer</p>
          </div> */}
          <Navbar />
        </div>

        {/* Dashboard Content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">Card 1</div>
          <div className="bg-white p-6 rounded-xl shadow">Card 2</div>
        </div>
      </main>
    </div>
  );
}
