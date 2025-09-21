import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard__content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/reports" element={<div>Reports Page</div>} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;