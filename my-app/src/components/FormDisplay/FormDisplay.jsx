// // src/components/FormDisplay.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const FormDisplay = () => {
//     const { id } = useParams(); // Get form ID from the URL
//     const [form, setForm] = useState(null);

//     useEffect(() => {
//         const fetchForm = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/forms/${id}`);
//                 setForm(response.data);
//                 console.log(response.data)
//             } catch (error) {
//                 console.error('Error fetching form:', error);
//             }
//         };

//         fetchForm();
//     }, [id]);

//     if (!form) return <p>Loading...</p>;

//     return (
//         <div>
//             <h1>form</h1>
//             <h2>{form.formName}</h2>
//             {form.fields.map((field, index) => (
//                 <div key={index}>
//                     <label>{field.label}</label>
//                     {field.type === 'text' && <input type="text" placeholder={field.placeholder} />}
//                     {field.type === 'email' && <input type="email" placeholder={field.placeholder} />}
//                     {field.type === 'text-area' && <textarea placeholder={field.placeholder}></textarea>}
//                     {field.type === 'dropdown' && (
//                         <select>
//                             {field.options.map((option, i) => (
//                                 <option key={i} value={option}>{option}</option>
//                             ))}
//                         </select>
//                     )}
//                     {/* Add other field types as needed */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default FormDisplay;

// // // src/components/FormDisplay.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './FormDisplay.css';


// const FormDisplay = () => {
//     const { id } = useParams(); // Get form ID from the URL
//     const [form, setForm] = useState(null);
//     const [formData, setFormData] = useState({}); // State to store form values
//     const [submitStatus, setSubmitStatus] = useState(''); // State for submission status

//     useEffect(() => {
//         const fetchForm = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/forms/${id}`);
//                 console.log("FORM DATA FIELDS", response)
//                 setForm(response.data);

//                 // Initialize formData with default values based on field types
//                 const initialData = {};
//                 response.data.fields.forEach(field => {
//                     if (field.type === 'checkbox-group') {
//                         initialData[field.label] = []; // Initialize checkbox with false
//                     } else if (field.type === 'radio-group') {
//                         initialData[field.label] = ''; // Initialize radio with an empty string
//                     } else {
//                         initialData[field.label] = ''; // Initialize other fields with empty string
//                     }
//                 });
//                 setFormData(initialData);

//             } catch (error) {
//                 console.error('Error fetching form:', error);
//             }
//         };

//         fetchForm();
//     }, [id]);

//     // Handle input change and update formData state
//     // const handleInputChange = (e, label, type) => {
//     //     const value = type === 'checkbox-group' ? e.target.checked : e.target.value;
//     //     setFormData({
//     //         ...formData,
//     //         [label]: value
//     //     });
//     // };
//     const handleInputChange = (e, label, type, option = null) => {
//         const value = type === 'checkbox-group' ? e.target.checked : e.target.value;
    
//         if (type === 'checkbox-group') {
//             // Handle checkbox-group by adding/removing options in the array
//             const updatedCheckboxes = formData[label] || [];
//             if (e.target.checked) {
//                 // Add the option if checked
//                 setFormData({
//                     ...formData,
//                     [label]: [...updatedCheckboxes, option]
//                 });
//             } else {
//                 // Remove the option if unchecked
//                 setFormData({
//                     ...formData,
//                     [label]: updatedCheckboxes.filter(item => item !== option)
//                 });
//             }
//         } else {
//             // Handle other input types (text, radio, etc.)
//             setFormData({
//                 ...formData,
//                 [label]: value
//             });
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form submit triggered");  // Add this to confirm
//         console.log("SUBMIT RESPONSE DATA", formData);

//         try {
//             console.log("SUBMIT RESPONSE DATA", formData)
//             const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/formresponse/${id}/responses`, formData);
//             setSubmitStatus('Form submitted successfully!');
//             console.log('Form submitted:', response.data);
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             setSubmitStatus('Failed to submit form. Please try again.');
//         }
//     };

//     if (!form) return <p>Loading...</p>;

//     return (
//         <div>
//             <h1>{form.formName}</h1>
//             <form onSubmit={handleSubmit}>
//                 {form.fields.map((field, index) => (
//                     <div key={index}>
//                         <label>{field.label}</label>
//                         {field.type === 'text' && (
//                             <input
//                                 type="text"
//                                 placeholder={field.placeholder}
//                                 value={formData[field.label]}
//                                 onChange={(e) => handleInputChange(e, field.label, field.type)}
//                             />
//                         )}
//                         {field.type === 'email' && (
//                             <input
//                                 type="email"
//                                 placeholder={field.placeholder}
//                                 value={formData[field.label]}
//                                 onChange={(e) => handleInputChange(e, field.label, field.type)}
//                             />
//                         )}
//                         {field.type === 'text-area' && (
//                             <textarea
//                                 placeholder={field.placeholder}
//                                 value={formData[field.label]}
//                                 onChange={(e) => handleInputChange(e, field.label, field.type)}
//                             ></textarea>
//                         )}
//                         {field.type === 'dropdown' && (
//                             <select
//                                 value={formData[field.label]}
//                                 onChange={(e) => handleInputChange(e, field.label, field.type)}
//                             >
//                                 {field.options.map((option, i) => (
//                                     <option key={i} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         )}
//                         {field.type === 'checkbox-group' && field.options.map((option, i) => (
//                             <div className="checkbox-group" key={i}>
//                                 <input
//                                     type="checkbox"
//                                     value={option}
//                                     checked={formData[field.label]?.includes(option)} // Check if option is in the array
//                                     onChange={(e) => handleInputChange(e, field.label, field.type, option)}
//                                 />
//                                 <label>{option}</label>
//                             </div>
//                         ))}
                       
//                         {/* {field.type === 'radio-group' && field.options.map((option, i) => (
//                             <div key={i}>
//                                 <input
//                                     type="radio-group"
//                                     value={option}
//                                     checked={formData[field.label] === option}
//                                     onChange={(e) => handleInputChange(e, field.label, field.type)}
//                                 />
//                                 <label>{option}</label>
//                             </div>
//                         ))}
//                          */}
//                          {field.type === 'radio-group' && field.options.map((option, i) => (
//                             <div className="radio-group" key={i}>
//                                 <input
//                                     type="radio"
//                                     value={option}
//                                     checked={formData[field.label] === option}
//                                     onChange={(e) => handleInputChange(e, field.label)}
//                                 />
//                                 <label>{option}</label>
//                             </div>
//                         ))}
//                         {field.type === 'rating' && (
//                             <input
//                                 type="range"
//                                 min="1"
//                                 max="5"
//                                 value={formData[field.label]}
//                                 onChange={(e) => handleInputChange(e, field.label, field.type)}
//                             />
                            
//                         )}
//                     </div>
//                 ))}
//                 <button type="submit">Submit</button>
//             </form>
//             {submitStatus && <p>{submitStatus}</p>}
//         </div>
//     );
// };

// export default FormDisplay;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FormDisplay.css';

const FormDisplay = () => {
    const { id } = useParams(); // Get form ID from the URL
    const [form, setForm] = useState(null);
    const [formData, setFormData] = useState({}); // State to store form values
    const [submitStatus, setSubmitStatus] = useState(''); // State for submission status

    // Fetch the form structure from the backend
    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/forms/${id}`);
                setForm(response.data);

                // Initialize formData with default values based on field types
                const initialData = {};
                response.data.fields.forEach(field => {
                    if (field.type === 'checkbox-group') {
                        initialData[field.label] = []; // Initialize checkboxes as an array
                    } else if (field.type === 'radio-group') {
                        initialData[field.label] = ''; // Initialize radios with an empty string
                    } else {
                        initialData[field.label] = ''; // Initialize other fields with an empty string
                    }
                });
                setFormData(initialData);
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [id]);

    // Handle input change and update formData state
    const handleInputChange = (e, label, type, option = null) => {
        const value = type === 'checkbox-group' ? e.target.checked : e.target.value;
    
        if (type === 'checkbox-group') {
            const updatedCheckboxes = formData[label] || [];
            if (e.target.checked) {
                // Add the option if checked
                setFormData({
                    ...formData,
                    [label]: [...updatedCheckboxes, option]
                });
            } else {
                // Remove the option if unchecked
                setFormData({
                    ...formData,
                    [label]: updatedCheckboxes.filter(item => item !== option)
                });
            }
        } else {
            // Handle other input types (text, radio, etc.)
            setFormData({
                ...formData,
                [label]: value
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        const formId = id; // Assuming `id` is the formId you're passing
        const responses = formData; // formData contains all the form field values

        // Construct the request body to match the backend's expectations
        const requestBody = {
        formId,      // Add formId
        responses    // Add responses (form field data)
        };


        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/formresponse/${id}/responses`, requestBody);
            setSubmitStatus('Form submitted successfully!');
            console.log('Form submitted:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('Failed to submit form. Please try again.');
        }
    };

    // Loading state
    if (!form) return <p>Loading...</p>;

    // Rendering the form
    return (
        <div>
            <h1>{form.formName}</h1>
            <form onSubmit={handleSubmit}>
                {form.fields.map((field, index) => (
                    <div key={index}>
                        <label>{field.label}</label>
                        
                        {field.type === 'text' && (
                            <input
                                type="text"
                                placeholder={field.placeholder}
                                value={formData[field.label]}
                                onChange={(e) => handleInputChange(e, field.label, field.type)}
                            />
                        )}

                        {field.type === 'email' && (
                            <input
                                type="email"
                                placeholder={field.placeholder}
                                value={formData[field.label]}
                                onChange={(e) => handleInputChange(e, field.label, field.type)}
                            />
                        )}

                        {field.type === 'text-area' && (
                            <textarea
                                placeholder={field.placeholder}
                                value={formData[field.label]}
                                onChange={(e) => handleInputChange(e, field.label, field.type)}
                            ></textarea>
                        )}

                        {field.type === 'dropdown' && (
                            <select
                                value={formData[field.label]}
                                onChange={(e) => handleInputChange(e, field.label, field.type)}
                            >
                                {field.options.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        )}

                        {field.type === 'checkbox-group' && field.options.map((option, i) => (
                            <div className="checkbox-group" key={i}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={formData[field.label]?.includes(option)} // Check if option is in the array
                                    onChange={(e) => handleInputChange(e, field.label, field.type, option)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}

                        {field.type === 'radio-group' && field.options.map((option, i) => (
                            <div className="radio-group" key={i}>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={formData[field.label] === option}
                                    onChange={(e) => handleInputChange(e, field.label, field.type)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}

                        {field.type === 'rating' && (
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={formData[field.label]}
                                onChange={(e) => handleInputChange(e, field.label, field.type)}
                            />
                        )}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {submitStatus && <p>{submitStatus}</p>}
        </div>
    );
};

export default FormDisplay;
