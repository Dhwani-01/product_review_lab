// import React, { useState } from 'react';
// import './SignUp.css'; // Import the CSS file for styling

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform form validation or API call here
//     console.log(formData);
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h2>Create an Account</h2>
//         <label htmlFor="username">Username</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Enter your username"
//           required
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Enter your email"
//           required
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Enter your password"
//           required
//         />

//         <label htmlFor="confirmPassword">Confirm Password</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm your password"
//           required
//         />

//         <button type="submit" className="signup-btn"><a href="/company">Sign Up</a></button>
//         <p>Aldready have account</p>
//         <button ><a href="/login" className="signup-btn">Login</a></button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    year_of_establishment: '',
    other_detail: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { name, type, year_of_establishment, other_detail, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/companies/register`, formData);
      setMessage(`Company registered successfully: ${res.data.name}`);
    } catch (error) {
      setMessage('Error in registration');
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Company Sign Up</h2>
      <form className="signup-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={name}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Company Type"
          value={type}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="year_of_establishment"
          placeholder="Year of Establishment"
          value={year_of_establishment}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="other_detail"
          placeholder="Other Details"
          value={other_detail}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
        <p>Aldready have account</p>
      <button ><a href="/login" className="signup-btn">Login</a></button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;

