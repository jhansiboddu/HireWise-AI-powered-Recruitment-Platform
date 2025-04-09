import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UploadResume from './pages/UploadResume';
import UploadJD from './pages/UploadJD';
import MatchCandidates from './pages/MatchCandidates';
import ShortlistedCandidates from './pages/ShortlistedCandidates';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/upload-jd" element={<UploadJD />} />
        <Route path="/match" element={<MatchCandidates />} />
        <Route path="/shortlisted" element={<ShortlistedCandidates />} />
      </Routes>
    </Router>
  );
}

export default App;
