// import React, { useState } from 'react';
// import './EventForm.css';

// const EventForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     date: '',
//     details: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Submitted:', formData);
//   };

//   return (
//     <form className="custom-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="date">Date:</label>
//         <input
//           type="date"
//           id="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="details">Details:</label>
//         <textarea
//           id="details"
//           name="details"
//           rows="5"
//           value={formData.details}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <button type="submit" className="submit-button">Submit</button>
//     </form>
//   );
// };

// export default EventForm;

import React, { useState } from 'react';
import axios from 'axios';
import './EventForm.css';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    details: ''
  });
  const [message, setMessage] = useState('');  // For feedback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');  // Retrieve token from local storage
      if (!token) {
        setMessage('No token found. Please log in.');
        return;
      }

      await axios.post('http://localhost:5000/api/events', formData, {
        headers: {
          'Authorization': `Bearer ${token}`  // Send token in Authorization header
        }
      });
      setMessage('Event created successfully!');
      setFormData({ name: '', date: '', details: '' });  // Clear form data
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage('Failed to create event');
    }
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="details">Details:</label>
        <textarea
          id="details"
          name="details"
          rows="5"
          value={formData.details}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EventForm;
