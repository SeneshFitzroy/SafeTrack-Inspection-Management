import React from 'react'
import "../css/dashboard.css"

const ShopDashboard = () => {

      // Sample data for the shops
  const shops = [
    { id: "13236", name: "ABC Cafe & Bakery", address: "585 Makuta Nort Makuta", owner: "Kasun Perera", telephone: "0774614743", licenseNo: "26467833", employees: "35" },
    { id: "13237", name: "Sunrise Groceries", address: "585 Makuta Nort Makuta", owner: "Kasun Perera", telephone: "0774614743", licenseNo: "26467833", employees: "35" },
    { id: "13238", name: "Golden Spoon Bakery", address: "585 Makuta Nort Makuta", owner: "Kasun Perera", telephone: "0774614743", licenseNo: "26467833", employees: "35" },
    { id: "13239", name: "Golden Bakery", address: "585 Makuta Nort Makuta", owner: "Kasun Perera", telephone: "0774614743", licenseNo: "26467833", employees: "35" },
    { id: "13240", name: "Urban Trends Clothing", address: "585 Makuta Nort Makuta", owner: "Kasun Perera", telephone: "0774614743", licenseNo: "26467833", employees: "35" },
    { id: "13241", name: "Wellness Pharmacy", address: "585 Makuta Nort Makuta", owner: "Kasun Perera", telephone: "0774614743", licenseNo: "26467833", employees: "35" },
    { id: "13242", name: "Fresh Catch Seafood", address: "585 Makuta Nort Makuta", owner: "Kasun Perera", telephone: "0774614743", licenseNo: "26467833", employees: "35" },
  ];

  return (
    <div>
      <div>
      <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-text">
            <span className="magnifier">🔍</span>
            <span className="logo-safe">Safe</span>Track
          </div>
        </div>
        <div className="menu-items">
          <div className="menu-item">
            <span className="icon">⬛</span>
            <span>Dashboard</span>
          </div>
          <div className="menu-item">
            <span className="icon">📅</span>
            <span>Calendar</span>
          </div>
          <div className="menu-item">
            <span className="icon">📋</span>
            <span>Inspection Log</span>
          </div>
          <div className="menu-item active">
            <span className="icon">🏪</span>
            <span>Shop Management</span>
          </div>
          <div className="menu-item">
            <span className="icon">📊</span>
            <span>Analytics</span>
          </div>
          <div className="menu-item">
            <span className="icon">👤</span>
            <span>Profile</span>
          </div>
          <div className="menu-item">
            <span className="icon">⚙️</span>
            <span>Settings</span>
          </div>
        </div>
        <div className="logout-container">
          <button className="logout-btn">
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search" />
            <button className="search-btn">🔍</button>
          </div>
          <div className="user-profile">
            <span className="user-icon">👤</span>
            <div className="user-info">
              <div className="user-name">Leo Perera</div>
              <div className="user-role">Admin</div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="button-group">
            <button className="add-btn">
              <span>+</span> Add Shop
            </button>
            <button className="export-btn">
              <span>↓</span> Export As Pdf
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Reference ID</th>
                  <th>Shop Name</th>
                  <th>Address</th>
                  <th>Owner</th>
                  <th>Telephone</th>
                  <th>Shop License No</th>
                  <th>No Of Employees</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((shop) => (
                  <tr key={shop.id}>
                    <td>{shop.id}</td>
                    <td>{shop.name}</td>
                    <td>{shop.address}</td>
                    <td>{shop.owner}</td>
                    <td>{shop.telephone}</td>
                    <td>{shop.licenseNo}</td>
                    <td>{shop.employees}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="view-btn">👁️</button>
                        <button className="edit-btn">✏️</button>
                        <button className="delete-btn">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}

export default ShopDashboard
