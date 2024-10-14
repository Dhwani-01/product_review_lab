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
import Modal from '../Modal/Modal.jsx';

const Company = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [responseModalOpen, setResponseModalOpen] = useState(false);  // New state for response modal
  const [selectedResponseLink, setSelectedResponseLink] = useState('');  // State for response link
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

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/events/company-events`, {
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
    // navigate('/formBuilder', { state: { eventId } }); 
    navigate(`/formBuilder/${eventId}` , { state: { eventId } });
  };

  const handleModalOpen = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/forms/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        // Set the fetched details
        console.log("response",response)
        console.log("response data link",response.data[0].link)
        setSelectedLink(response.data[0].link)
     // setSelectedLink(`${window.location.origin}${response.data.link}`);
      setModalOpen(true);  // Open modal after setting the data
    } catch (error) {
      console.error('Error fetching event details:', error);
      setError('Failed to fetch event details');
    }
  };

  const handleResponseModalOpen = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/formresponse/response/${eventId}/responses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("RESponse",response.data)
      //setSelectedResponseLink(response.data[0].responseLink);  // Assuming your backend returns 'responseLink'
      const responseLink = `/responses/${eventId}`;
      setSelectedResponseLink(responseLink); 
      setResponseModalOpen(true);  // Open modal for response link
    } catch (error) {
      console.error('Error fetching response link:', error);
      setError('Failed to fetch response link');
    }
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
                
                <button className="view-button" onClick={() => handleModalOpen(event._id)}>Link</button>
                {/* <button className="view-button">Link</button> */}
                {/* <a href={event.link} target="_blank" rel="noopener noreferrer">
                    <button className="view-button">Link</button>
                  </a> */}
                  {/* Modal Component */}
                {modalOpen && (
                  <Modal 
                    isOpen={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                    link={`${window.location.origin}${selectedLink}`}  // Passing the selected link to the modal
                  />
                )}
                {/* <button className="view-button">Response Link</button> */}
                <button className="view-button" onClick={() => handleResponseModalOpen(event._id)}>Response Link</button>

                {/* Response Link Modal */}
                {responseModalOpen && (
                    <Modal 
                      isOpen={responseModalOpen} 
                      onClose={() => setResponseModalOpen(false)} 
                      link={`${window.location.origin}${selectedResponseLink}`}  // Passing response link to modal
                    />
                  )}

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
