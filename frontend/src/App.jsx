import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import All from './all';
import Home from './Home';
import './all.css'

const App = ({ students, setStudents }) => {
  const navigate = useNavigate(); // Get the navigate function
  const handleDashboardClick = () => {
    navigate('/home'); // Navigate to /home
  };

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<All handleDashboardClick={handleDashboardClick} />} />
        <Route path="/home" element={<Home students={students} setStudents={setStudents} />} />
      </Routes>
    </div>
  );
};

export default App;