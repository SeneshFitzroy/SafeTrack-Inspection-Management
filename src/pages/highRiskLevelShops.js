import React from "react";
import {
  FaUserCircle,
  FaSearch,
  FaCalendarAlt,
  FaClipboardList,
  FaStore,
  FaChartBar,
  FaUser,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

// Sample data for bar chart
const data = [
  { day: 5, inspections: 500 },
  { day: 10, inspections: 700 },
  { day: 15, inspections: 1300 },
  { day: 20, inspections: 1100 },
  { day: 25, inspections: 600 },
  { day: 30, inspections: 400 },
];

// ✅ Define table data
const tableRows = Array(11).fill({
  refNo: "13236",
  shopName: "ABC Cafe & Bakery",
  region: "Biyagama",
  lastInspection: "2024-10-05",
  nextInspection: "2025-01-04",
});

export default function TotalInspection() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 10; i <= currentYear; i++) {
    years.push(i);
  }

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <FaSearch className="text-blue-600 text-2xl" />
          <span className="text-2xl font-bold text-blue-700">Safe</span>
          <span className="text-2xl font-bold">Track</span>
        </div>
        <nav className="flex-1 mt-6 space-y-2">
          <MenuItem icon={<FaChartBar />} text="Dashboard" />
          <MenuItem icon={<FaCalendarAlt />} text="Calendar" />
          <MenuItem icon={<FaClipboardList />} text="Inspection Log" />
          <MenuItem icon={<FaStore />} text="Shop Management" />
          <MenuItem icon={<FaChartBar />} text="Analytics" active />
          <MenuItem icon={<FaUser />} text="Profile" />
          <MenuItem icon={<FaCog />} text="Settings" />
        </nav>
        <button className="m-4 py-2 px-4 bg-red-600 text-white rounded-md flex items-center justify-center gap-2">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Analytics Overview</h1>
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl" />
            <div>
              <p className="font-semibold">Leo Perera</p>
              <p className="text-sm text-gray-500">PHI</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button className="px-6 py-2 bg-white text-black font-semibold w-1/3">
            Total Inspections This Year
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white border border-b-0 font-semibold w-1/3">
            High-Risk Level Shops
          </button>
          <button className="px-6 py-2 bg-white text-black border border-b-0 font-semibold w-1/3">
            Category-Based Shop Analytics
          </button>
        </div>

        {/* Modified Table Container */}
        <div className="overflow-x-auto w-full max-w-full -mx-6 px-6">
          <table className="table-auto text-left border border-gray-200 w-full min-w-full">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="py-2 px-4">Reference No</th>
                <th className="py-2 px-4">Shop Name</th>
                <th className="py-2 px-4">GN Region</th>
                <th className="py-2 px-4">Last Inspection</th>
                <th className="py-2 px-4">Next Inspection</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{row.refNo}</td>
                  <td className="py-2 px-4">{row.shopName}</td>
                  <td className="py-2 px-4">{row.region}</td>
                  <td className="py-2 px-4">{row.lastInspection}</td>
                  <td className="py-2 px-4">{row.nextInspection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function MenuItem({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
        active ? "bg-blue-600 text-white mx-2" : "hover:bg-gray-100 text-black"
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}


