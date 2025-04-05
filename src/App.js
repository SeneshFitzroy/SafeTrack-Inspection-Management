import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TotalInspection from './pages/totalInspection';
import './output.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TotalInspection />} />
        {/* Add other routes below as needed */}
      </Routes>
    </Router>
  );
}

export default App;

