// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Ensure the CSS file is correctly named and imported

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
    </nav>
  );
}

export default Navbar;
