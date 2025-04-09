// src/components/Navbar.js
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">RecruitAI</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/upload-resume">Upload Resume</a></li>
        <li><a href="/upload-jd">Upload JD</a></li>
        <li><a href="/match">Match</a></li>
        <li><a href="/shortlisted">Shortlisted</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
