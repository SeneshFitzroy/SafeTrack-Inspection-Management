import React from "react";
import { FaUserCircle, FaSearch, FaCalendarAlt, FaClipboardList, FaStore, FaChartBar, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"; // Import icons
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


const data = [
  { day: 5, inspections: 500 },
  { day: 10, inspections: 700 },
  { day: 15, inspections: 1300 },
  { day: 20, inspections: 1100 },
  { day: 25, inspections: 600 },
  { day: 30, inspections: 400 },
];

export default function TotalInspection() {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 10; i <= currentYear + 0; i++) {
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
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold w-1/3">
            Total Inspections This Year
          </button>
          <button className="px-6 py-2 bg-white text-black border border-b-0 font-semibold w-1/3">
            High-Risk Level Shops
          </button>
          <button className="px-6 py-2 bg-white text-black border border-b-0 font-semibold w-1/3">
            Category-Based Shop Analytics
          </button>
        </div>
 {/* Chart */}
 <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold">Total Inspections : <span className="text-black">1500+</span></p>
            <div className="flex gap-2">
  {/* Month Dropdown */}
  <select className="bg-blue-100 text-black px-3 py-1 rounded-xl">
    {months.map((month, index) => (
      <option key={index} value={month}>
        {month}
      </option>
    ))}
  </select>

  {/* Year Dropdown */}
  <select className="bg-blue-100 text-black px-3 py-1 rounded-xl">
    {years.map((year, index) => (
      <option key={index} value={year}>
        {year}
      </option>
    ))}
  </select>
</div>

          </div>
          <ResponsiveContainer width="100%" height={350}>
  <BarChart
    data={data}
    margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
  >
    {/* Dashed grid lines */}
    <CartesianGrid strokeDasharray="3 3" />
    
    <XAxis
      dataKey="day"
      label={{
        value: "(Days)",
        position: "insideBottomRight",
        offset: -5
      }}
    />
    <YAxis
      label={{
        value: "(Inspections)",
        angle: 0,
        dy: 10,
        position: "insideTopRight",
        offset: 10,
        dx: 50,
        dy: -30
      }}
      ticks={[0, 100, 300, 500, 700, 900, 1200, 1500]}
    />
    <Tooltip />
    <Bar dataKey="inspections" fill="#2196f3" barSize={60} radius={[24, 24, 0, 0]} />
  </BarChart>
</ResponsiveContainer>







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
        } ${active ? "" : ""}`} // Remove rounded style for both active and hover
      >
        {icon}
        <span className="font-medium">{text}</span>
      </div>
    );
  }
  
  
  


  
