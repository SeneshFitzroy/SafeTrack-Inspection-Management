import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TotalInspection from './pages/totalInspection';
import CategoryBasedShopAnalytics from './pages/categoryBasedShopAnalytics'; // ✅ updated import
import './output.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TotalInspection />} />
        <Route path="/category-Based-Shop-Analytics" element={<CategoryBasedShopAnalytics />} /> {/* ✅ added route */}
      </Routes>
    </Router>
  );
}

export default App;



