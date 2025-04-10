// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom"; // Use Link for SPA routing
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">HireWise</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <span className="dropbtn">Actions ▾</span>
          <div className="dropdown-content">
            <Link to="/upload-resume">Upload Resume</Link>
            <Link to="/upload-jd">Upload JD</Link>
            <Link to="/match">Match</Link>
            <Link to="/shortlisted">Shortlisted</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
