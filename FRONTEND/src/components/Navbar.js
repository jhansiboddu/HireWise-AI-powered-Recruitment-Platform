// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const handleScrollLink = (path, sectionId) => {
    if (location.pathname !== path) {
      // Navigate to the target route + section
      window.location.href = `${path}#${sectionId}`;
    } else {
      // Already on the page, smooth scroll
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">HireWise</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        <li>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleScrollLink("/", "services"); // path to HireWiseAbout.js
            }}
          >
            Our Services
          </a>
        </li>

        <li>
          <a
            href="#imageslider"
            onClick={(e) => {
              e.preventDefault();
              handleScrollLink("/", "imageslider"); // path to HireWiseAbout.js
            }}
          >
            Analytics
          </a>
        </li>

        <li><Link to="/dashboard">Dashboard</Link></li>

        <li className="dropdown">
          <span className="dropbtn">Actions ▾</span>
          <div className="dropdown-content">
            <Link to="/upload-jd">Upload JD</Link>
            <Link to="/upload-resume">Upload Resume</Link>
            <Link to="/match">Match</Link>
            <Link to="/shortlisted">Shortlisted Candidates</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
