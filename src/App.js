import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TotalInspection from './pages/totalInspection';
import HighRiskLevelShops from './pages/highRiskLevelShops'; // ✅ updated import
import './output.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TotalInspection />} />
        <Route path="/high-risk-shops" element={<HighRiskLevelShops />} /> {/* ✅ added route */}
      </Routes>
    </Router>
  );
}

export default App;



