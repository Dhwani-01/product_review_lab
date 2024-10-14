import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For programmatic navigation
import axios from 'axios';  // For making HTTP requests
import './HomeCompany.css';

const HomeCompany = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate=useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('token');  // Retrieve token from local storage
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/companies/me`, {
          headers: {
            'Authorization': `Bearer ${token}`  // Send token in Authorization header
          }
        });
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company data:', error);
        setError('Failed to fetch company details');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleButtonClick = () => {
    navigate('/eventform');  // Navigate to the /eventform route
  };

  const handleButtonClick_event = () => {
    navigate('/company');  // Navigate to the /eventform route
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-company-container">
      <div className="home-company-content">
      {company ? (
        <>
          <h1>Welcome, {company.name}!</h1>
          <p><strong>Type:</strong> {company.type}</p>
          <p><strong>Year of Establishment:</strong> {company.year_of_establishment}</p>
          <p><strong>Other Details:</strong> {company.other_detail}</p>
          <button onClick={handleButtonClick} className="home-company-button">Add Event</button>
          <button onClick={handleButtonClick_event} className="home-company-button">Event</button>
        </>
      ) : (
        <p>Company not found</p>
      )}
    </div>
    </div>
  );
};

export default HomeCompany;
