// import React from 'react';
// import './Navbar.css';  // Optional if you want to include styling

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <a href="/">TrustReviews</a>
//       </div>
//       <ul className="navbar-links">
//         <li><a href="/">Features</a></li>
//         <li><a href="/about">Integration</a></li>
//         <li><a href="/services">About Us</a></li>
//         <li><a href="/signup">Sign up</a></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import './Navbar.css';  // Optional if you want to include styling

const Navbar = () => {
  const navigate = useNavigate();  // Initialize navigate
  const token = localStorage.getItem('token');  // Check if token exists

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from local storage
    navigate('/login');  // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">TrustReviews</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Features</a></li>
        <li><a href="/about">Integration</a></li>
        <li><a href="/services">About Us</a></li>
        {token ? (
          <li><button onClick={handleLogout} className="navbar-logout">Logout</button></li>
        ) : (
          <li><a href="/signup">Sign up</a></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
