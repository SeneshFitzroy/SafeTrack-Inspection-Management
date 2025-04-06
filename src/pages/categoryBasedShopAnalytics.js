import React from "react";
import { FaUserCircle, FaSearch, FaCalendarAlt, FaClipboardList, FaStore, FaChartBar, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"; // Import icons
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'A Grade', value: 30, color: '#008000' },  // Green (first)
  { name: 'B Grade', value: 10, color: '#dc2626' },    // Red (second)
  { name: 'C Grade', value: 40, color: '#FFFF00' }, // Yellow (now third)
  { name: 'D Grade', value: 20, color: '#FFA500' }, // Orange (now fourth)
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
          <button className="px-6 py-2 bg-white text-black font-semibold w-1/3">
            Total Inspections This Year
          </button>
          <button className="px-6 py-2 bg-white text-black border border-b-0 font-semibold w-1/3">
            High-Risk Level Shops
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white border border-b-0 font-semibold w-1/3">
            Category-Based Shop Analytics
          </button>
        </div>

        <div className="flex gap-6 mb-6">
          {/* Table */}
          <div className="bg-white rounded-xl shadow p-6 flex-1 overflow-auto">
            <h3 className="text-xl font-semibold mb-4">Inspection Logs</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="py-2 px-4">Reference No</th>
                  <th className="py-2 px-4">Shop Name</th>
                  <th className="py-2 px-4">GN Region</th>
                </tr>
              </thead>
              <tbody>
                {Array(10).fill(0).map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">13236</td>
                    <td className="py-2 px-4">ABC Cafe & Bakery</td>
                    <td className="py-2 px-4">Biyagama</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie Chart */}
          <div className="rounded-xl shadow p-6 flex flex-col items-center flex-1" style={{ backgroundColor: '#e6f4ff' }}>
            <h3 className="text-xl font-semibold mb-4 text-black">Risk Levels by Shop Type</h3>
            <PieChart width={500} height={400}> {/* Increased width of the chart */}
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={160}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* Custom Legend with Square Boxes and Gap */}
              <Legend
  layout="horizontal"
  verticalAlign="bottom"
  align="center"
  content={({ payload }) => (
    <div className="flex justify-center">
      {payload.map((entry, index) => (
        <div key={`legend-item-${index}`} className="flex items-center mx-6"> {/* Adjusted margin */}
          <div
            style={{
              width: '15px',
              height: '15px',
              backgroundColor: entry.payload.color,
              borderRadius: '4px', // Rounded corners
            }}
            className="mr-3" // Increased margin between the color box and text
          />
          <span>{entry.payload.name}</span>
        </div>
      ))}
    </div>
  )}
/>


            </PieChart>
          </div>
        </div>
      </main>
    </div>
  );
}

function MenuItem({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${active ? "bg-blue-600 text-white mx-2" : "hover:bg-gray-100 text-black"}`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}







  
