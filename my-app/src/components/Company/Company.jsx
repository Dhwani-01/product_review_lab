// // Company.jsx
// import React from 'react';
// import './Company.css';
// import Amazon_logo from '../../Assets/Amazon_logo.png';
// import Amazon_Wow from '../../Assets/Amazon_Wow.jpeg'

// const Company = () => {
//   return (
//     <div className="company-header">
//       <div className="logo-container">
//         <img src={Amazon_logo} alt="Company Logo" className="logo" />
//         <h1 className="company-name">Amazon</h1>
//       </div>
//       <div className="cart-container">
//         <div className="cart-item">
//           <img src={Amazon_Wow} alt="Shopping Cart" className="cart-image" />
//           <div className="cart-content">
//             <h2 className="cart-title">Amazon Wow Seminar 1</h2>
//             <p className="cart-description">Women in Tech</p>
//             <button className="view-button">View</button>
//           </div>
//         </div>
//         <div className="cart-item">
//           <img src={Amazon_Wow}  alt="Wishlist" className="cart-image" />
//           <div className="cart-content">
//             <h2 className="cart-title">Amazon Wow Seminar 2</h2>
//             <p className="cart-description">Women in Tech</p>
//             <button className="view-button">View</button>
//           </div>
//         </div>
//         <div className="cart-item">
//           <img src={Amazon_Wow}  alt="Order History" className="cart-image" />
//           <div className="cart-content">
//             <h2 className="cart-title">Amazon Wow Seminar 3</h2>
//             <p className="cart-description">Women in Tech</p>
//             <button className="view-button">View</button>
//           </div>
//         </div>
//       </div>
//       <button className="add-button"><a href='/eventform'>Add</a></button>
//     </div>
//   );
// };

// export default Company;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Company.css';
import { useNavigate } from 'react-router-dom'; 
import Amazon_logo from '../../Assets/Amazon_logo.png';
import Amazon_Wow from '../../Assets/Amazon_Wow.jpeg';

const Company = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/events/company-events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleButtonClick = (eventId) => {
    // navigate('/formBuilder' );  // Navigate to the /eventform route
    // navigate(`/formBuilder?eventId=${eventId}`); 
    console.log(eventId)
    navigate('/formBuilder', { state: { eventId } }); 
  };

  return (
    <div className="company-header">
      <div className="logo-container">
        <img src={Amazon_logo} alt="Company Logo" className="logo" />
        <h1 className="company-name">Amazon</h1>
      </div>
      <div className="cart-container">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="cart-item" key={event._id}>
              <img src={Amazon_Wow} alt="Event" className="cart-image" />
              <div className="cart-content">
                <h2 className="cart-title">{event.name}</h2>
                <p className="cart-description">{event.details}</p>
                <div className="button-container">
                {/* <button className="view-button" onClick={handleButtonClick}>Create Form</button> */}
                <button className="view-button" onClick={() => handleButtonClick(event._id)}>Create Form</button>
                <button className="view-button">Link</button>
                <button className="view-button">Response Link</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
      <button className="add-button"><a href='/eventform'>Add</a></button>
    </div>
  );
};

export default Company;
