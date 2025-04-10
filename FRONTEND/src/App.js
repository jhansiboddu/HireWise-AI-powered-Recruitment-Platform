import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UploadResume from './pages/UploadResume';
import UploadJD from './pages/UploadJD';
import MatchCandidates from './pages/MatchCandidates';
import ShortlistedCandidates from './pages/ShortlistedCandidates';
import Dashborad from './pages/dashboard'
import AllJobs from "./pages/AllJobs";

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
        <Route path="/all-jobs" element={<AllJobs />} /> 
        <Route path="/dashborad" element={<Dashborad />}/>
      </Routes>
    </Router>
  );
}

export default App;
