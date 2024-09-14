// Company.jsx
import React from 'react';
import './Company.css';
import Amazon_logo from '../../Assets/Amazon_logo.png';
import Amazon_Wow from '../../Assets/Amazon_Wow.jpeg'

const Company = () => {
  return (
    <div className="company-header">
      <div className="logo-container">
        <img src={Amazon_logo} alt="Company Logo" className="logo" />
        <h1 className="company-name">Amazon</h1>
      </div>
      <div className="cart-container">
        <div className="cart-item">
          <img src={Amazon_Wow} alt="Shopping Cart" className="cart-image" />
          <div className="cart-content">
            <h2 className="cart-title">Amazon Wow Seminar 1</h2>
            <p className="cart-description">Women in Tech</p>
            <button className="view-button">View</button>
          </div>
        </div>
        <div className="cart-item">
          <img src={Amazon_Wow}  alt="Wishlist" className="cart-image" />
          <div className="cart-content">
            <h2 className="cart-title">Amazon Wow Seminar 2</h2>
            <p className="cart-description">Women in Tech</p>
            <button className="view-button">View</button>
          </div>
        </div>
        <div className="cart-item">
          <img src={Amazon_Wow}  alt="Order History" className="cart-image" />
          <div className="cart-content">
            <h2 className="cart-title">Amazon Wow Seminar 3</h2>
            <p className="cart-description">Women in Tech</p>
            <button className="view-button">View</button>
          </div>
        </div>
      </div>
      <button className="add-button"><a href='/eventform'>Add</a></button>
    </div>
  );
};

export default Company;
