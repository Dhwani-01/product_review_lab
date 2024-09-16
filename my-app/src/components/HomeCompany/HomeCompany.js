import React, { useEffect, useState } from 'react';
import axios from 'axios';  // For making HTTP requests
import './HomeCompany.css';

const HomeCompany = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('token');  // Retrieve token from local storage
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/companies/me', {
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
        </>
      ) : (
        <p>Company not found</p>
      )}
    </div>
    </div>
  );
};

export default HomeCompany;
