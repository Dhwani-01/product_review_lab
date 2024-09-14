import React from 'react';
import './Navbar.css';  // Optional if you want to include styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">TrustReviews</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Features</a></li>
        <li><a href="/about">Integration</a></li>
        <li><a href="/services">About Us</a></li>
        <li><a href="/signup">Sign up</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

