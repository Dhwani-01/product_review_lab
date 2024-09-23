// import React, { useState } from 'react';
// import axios from 'axios';
// import './FormBuilder.css';

// const FormBuilder = ({ eventId }) => {
//   const [fields, setFields] = useState([]);
//   const [formName, setFormName] = useState('');
//   const [tableColumns, setTableColumns] = useState([]); // New state for table columns

//   const addField = (type) => {
//     setFields([...fields, { type, label: '' }]);
//   };

//   const handleLabelChange = (index, label) => {
//     const newFields = [...fields];
//     newFields[index].label = label;
//     setFields(newFields);
//   };

//   const addTableColumn = () => {
//     setTableColumns([...tableColumns, '']); // Add empty column name
//   };

//   const handleColumnChange = (index, value) => {
//     const updatedColumns = [...tableColumns];
//     updatedColumns[index] = value; // Update column name
//     setTableColumns(updatedColumns);
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:5000/api/forms', {
//         eventId,
//         formName,
//         fields,
//         tableColumns // Send table columns to the backend
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       console.log('Form created successfully', response.data);
//     } catch (error) {
//       console.error('Error saving form', error);
//     }
//   };

//   return (
//     <div className="form-builder-container">
//       <h2>Create Form for Event</h2>
//       <input
//         type="text"
//         value={formName}
//         onChange={(e) => setFormName(e.target.value)}
//         placeholder="Enter Form Name"
//         className="form-name-input"
//       />
      
//       {/* Add Table Columns */}
//       <h3>Table Columns</h3>
//       {tableColumns.map((col, index) => (
//         <input
//           key={index}
//           type="text"
//           value={col}
//           onChange={(e) => handleColumnChange(index, e.target.value)}
//           placeholder={`Enter column name ${index + 1}`}
//         />
//       ))}
//       <button onClick={addTableColumn}>Add Column</button>
      
//       {/* Form Fields */}
//       <h3>Form Fields</h3>
//       {fields.map((field, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={field.label}
//             onChange={(e) => handleLabelChange(index, e.target.value)}
//             placeholder="Enter field label"
//           />
//           <span>{field.type}</span>
//         </div>
//       ))}
//       <div className="button-container">
//         <button onClick={() => addField('text')}>Add Text Input</button>
//         <button onClick={() => addField('checkbox')}>Add Checkbox</button>
//         <button onClick={() => addField('radio')}>Add Radio Button</button>
//       </div>
//       <button className="save-button" onClick={handleSubmit}>Save Form</button>
//     </div>
//   );
// };

// export default FormBuilder;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './FormBuilder.css';

// const FormBuilder = ({ eventId }) => {
//   const [formName, setFormName] = useState('');
//   const [selectedForm, setSelectedForm] = useState(null); // State to store selected form template
//   const [fields, setFields] = useState([]);
//   const [tableColumns, setTableColumns] = useState([]);

//   // Define form templates
//   const formTemplates = [
//     {
//       name: 'Customer Feedback',
//       description: 'Help us improve by sharing your experience.',
//       fields: [
//         { type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
//         { type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
//         { type: 'text-area', label: 'How was your experience?', placeholder: 'Tell us about your experience', required: true },
//         { type: 'radio-group', label: 'Would you recommend us to others?', options: ['Yes', 'No'], required: true },
//         { type: 'rating', label: 'Rate our service', max: 5, required: true }
//       ],
//     },
//     {
//       name: 'Product Review',
//       description: 'Share your feedback on the product you purchased.',
//       fields: [
//         { type: 'text', label: 'Product Name', placeholder: 'Enter the product name', required: true },
//         { type: 'number', label: 'Order Number', placeholder: 'Enter your order number', required: true },
//         { type: 'dropdown', label: 'Product Category', options: ['Electronics', 'Clothing', 'Home Appliances', 'Books'], required: true },
//         { type: 'rating', label: 'Rate the product', max: 5, required: true },
//         { type: 'text-area', label: 'What do you like about the product?', placeholder: 'Describe what you liked', required: true },
//         { type: 'text-area', label: 'What can be improved?', placeholder: 'Describe any improvements', required: false },
//       ],
//     },
//     {
//       name: 'Event Feedback',
//       description: 'Tell us your thoughts on the event you attended.',
//       fields: [
//         { type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
//         { type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
//         { type: 'text', label: 'Event Name', placeholder: 'Enter the event name', required: true },
//         { type: 'dropdown', label: 'How did you hear about this event?', options: ['Social Media', 'Email', 'Friend', 'Website'], required: true },
//         { type: 'radio-group', label: 'Was the event informative?', options: ['Yes', 'No'], required: true },
//         { type: 'rating', label: 'Rate the overall event', max: 5, required: true },
//         { type: 'checkbox-group', label: 'Would you attend this event again?', options: ['Yes', 'No', 'Maybe'] },
//         { type: 'text-area', label: 'What was the most valuable part of the event?', placeholder: 'Share your thoughts', required: true },
//       ],
//     }
//   ];
  

//   // Handle form selection from the sidebar
//   const selectFormTemplate = (template) => {
//     setSelectedForm(template);
//     setFields(template.fields); // Set fields for the selected form
//     setFormName(template.name);
//   };

//   const handleLabelChange = (index, label) => {
//     const newFields = [...fields];
//     newFields[index].label = label;
//     setFields(newFields);
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:5000/api/forms', {
//         eventId,
//         formName,
//         fields,
//         tableColumns,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       console.log('Form created successfully', response.data);
//     } catch (error) {
//       console.error('Error saving form', error);
//     }
//   };

// //   return (
// //     <div className="form-builder-layout">
// //       {/* Sidebar */}
// //       <div className="sidebar">
// //         <h2>Form Templates</h2>
// //         <ul>
// //           {formTemplates.map((template, index) => (
// //             <li key={index} onClick={() => selectFormTemplate(template)}>
// //               {template.name}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* Main Content Area */}
// //       <div className="form-content">
// //         {selectedForm ? (
// //           <>
// //             <h2>{formName}</h2>
// //             <h3>Form Fields</h3>
// //             {fields.map((field, index) => (
// //               <div key={index}>
// //                 <input
// //                   type="text"
// //                   value={field.label}
// //                   onChange={(e) => handleLabelChange(index, e.target.value)}
// //                   placeholder="Enter field label"
// //                 />
// //                 <span>{field.type}</span>
// //               </div>
// //             ))}
// //             <button className="save-button" onClick={handleSubmit}>Save Form</button>
// //           </>
// //         ) : (
// //           <h2>Select a form from the sidebar</h2>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };
// // Assuming you've selected a form from the sidebar

// return (
//   <div className="form-content">
//     <h2>{selectedForm.name}</h2>
//     <p>{selectedForm.description}</p>
    
//     <form>
//       {fields.map((field, index) => {
//         switch(field.type) {
//           case 'text':
//             return (
//               <div key={index}>
//                 <label>{field.label}</label>
//                 <input
//                   type="text"
//                   placeholder={field.placeholder}
//                   required={field.required}
//                 />
//               </div>
//             );
//           case 'email':
//             return (
//               <div key={index}>
//                 <label>{field.label}</label>
//                 <input
//                   type="email"
//                   placeholder={field.placeholder}
//                   required={field.required}
//                 />
//               </div>
//             );
//           case 'text-area':
//             return (
//               <div key={index}>
//                 <label>{field.label}</label>
//                 <textarea
//                   placeholder={field.placeholder}
//                   required={field.required}
//                 />
//               </div>
//             );
//           case 'radio-group':
//             return (
//               <div key={index}>
//                 <label>{field.label}</label>
//                 {field.options.map((option, i) => (
//                   <div key={i}>
//                     <input type="radio" name={field.label} value={option} required={field.required} />
//                     <label>{option}</label>
//                   </div>
//                 ))}
//               </div>
//             );
//           case 'dropdown':
//             return (
//               <div key={index}>
//                 <label>{field.label}</label>
//                 <select required={field.required}>
//                   {field.options.map((option, i) => (
//                     <option key={i} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>
//             );
//           case 'checkbox-group':
//             return (
//               <div key={index}>
//                 <label>{field.label}</label>
//                 {field.options.map((option, i) => (
//                   <div key={i}>
//                     <input type="checkbox" value={option} />
//                     <label>{option}</label>
//                   </div>
//                 ))}
//               </div>
//             );
//           case 'rating':
//             return (
//               <div key={index}>
//                 <label>{field.label}</label>
//                 {[...Array(field.max)].map((_, i) => (
//                   <span key={i}>⭐</span>
//                 ))}
//               </div>
//             );
//           default:
//             return null;
//         }
//       })}
//       <button type="submit">Submit</button>
//     </form>
//   </div>
// );
// };

// export default FormBuilder;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './FormBuilder.css';

// const FormBuilder = ({ eventId }) => {
//   const [formName, setFormName] = useState('');
//   const [selectedForm, setSelectedForm] = useState(null); // State to store selected form template
//   const [fields, setFields] = useState([]);
//   const [tableColumns] = useState([]);

//   // Define form templates
//   const formTemplates = [
//     {
//       name: 'Customer Feedback',
//       description: 'Help us improve by sharing your experience.',
//       fields: [
//         { type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
//         { type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
//         { type: 'text-area', label: 'How was your experience?', placeholder: 'Tell us about your experience', required: true },
//         { type: 'radio-group', label: 'Would you recommend us to others?', options: ['Yes', 'No'], required: true },
//         { type: 'rating', label: 'Rate our service', max: 5, required: true },
//       ],
//     },
//     {
//       name: 'Product Review',
//       description: 'Share your feedback on the product you purchased.',
//       fields: [
//         { type: 'text', label: 'Product Name', placeholder: 'Enter the product name', required: true },
//         { type: 'number', label: 'Order Number', placeholder: 'Enter your order number', required: true },
//         { type: 'dropdown', label: 'Product Category', options: ['Electronics', 'Clothing', 'Home Appliances', 'Books'], required: true },
//         { type: 'rating', label: 'Rate the product', max: 5, required: true },
//         { type: 'text-area', label: 'What do you like about the product?', placeholder: 'Describe what you liked', required: true },
//         { type: 'text-area', label: 'What can be improved?', placeholder: 'Describe any improvements', required: false },
//       ],
//     },
//     {
//       name: 'Event Feedback',
//       description: 'Tell us your thoughts on the event you attended.',
//       fields: [
//         { type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
//         { type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
//         { type: 'text', label: 'Event Name', placeholder: 'Enter the event name', required: true },
//         { type: 'dropdown', label: 'How did you hear about this event?', options: ['Social Media', 'Email', 'Friend', 'Website'], required: true },
//         { type: 'radio-group', label: 'Was the event informative?', options: ['Yes', 'No'], required: true },
//         { type: 'rating', label: 'Rate the overall event', max: 5, required: true },
//         { type: 'checkbox-group', label: 'Would you attend this event again?', options: ['Yes', 'No', 'Maybe'] },
//         { type: 'text-area', label: 'What was the most valuable part of the event?', placeholder: 'Share your thoughts', required: true },
//       ],
//     }
//   ];

//   // Handle form selection from the sidebar
//   const selectFormTemplate = (template) => {
//     setSelectedForm(template);
//     setFields(template.fields); // Set fields for the selected form
//     setFormName(template.name);
//   };

//   // const handleLabelChange = (index, label) => {
//   //   const newFields = [...fields];
//   //   newFields[index].label = label;
//   //   setFields(newFields);
//   // };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:5000/api/forms', {
//         eventId,
//         formName,
//         fields,
//         tableColumns,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       console.log('Form created successfully', response.data);
//     } catch (error) {
//       console.error('Error saving form', error);
//     }
//   };

//   return (
//     <div className="form-builder-layout">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h2>Form Templates</h2>
//         <ul>
//           {formTemplates.map((template, index) => (
//             <li key={index} onClick={() => selectFormTemplate(template)}>
//               {template.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content Area */}
//       <div className="form-content">
//         {selectedForm ? (
//           <>
//             <h2>{selectedForm.name}</h2>
//             <p>{selectedForm.description}</p>
//             <h3>Form Fields</h3>
//             {fields.map((field, index) => (
//               <div key={index}>
//                 <label>{field.label}</label>
//                 {field.type === 'text' && (
//                   <input
//                     type="text"
//                     placeholder={field.placeholder}
//                     required={field.required}
//                   />
//                 )}
//                 {field.type === 'email' && (
//                   <input
//                     type="email"
//                     placeholder={field.placeholder}
//                     required={field.required}
//                   />
//                 )}
//                 {field.type === 'text-area' && (
//                   <textarea
//                     placeholder={field.placeholder}
//                     required={field.required}
//                   ></textarea>
//                 )}
//                 {field.type === 'radio-group' && (
//                   field.options.map((option, i) => (
//                     <div key={i}>
//                       <input type="radio" name={field.label} value={option} required={field.required} />
//                       <label>{option}</label>
//                     </div>
//                   ))
//                 )}
//                 {field.type === 'dropdown' && (
//                   <select required={field.required}>
//                     {field.options.map((option, i) => (
//                       <option key={i} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 )}
//                 {field.type === 'rating' && (
//                   <div className="rating">
//                     {[...Array(field.max)].map((_, i) => (
//                       <span key={i}>⭐</span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//             <button className="save-button" onClick={handleSubmit}>Save Form</button>
//           </>
//         ) : (
//           <h2>Select a form from the sidebar</h2>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import './FormBuilder.css';
import Modal from '../Modal/Modal.jsx';

const FormBuilder = () => {

  const location = useLocation();
  const eventId = location.state?.eventId;  // Access eventId from state
  
  const [formName, setFormName] = useState('');
  const [selectedForm, setSelectedForm] = useState(null);
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ type: 'text', label: '', placeholder: '', options: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [formLink, setFormLink] = useState('');
  //const [tableColumns] = useState([]);

  // Define form templates
  const formTemplates = [
    {
      name: 'Customer Feedback',
      description: 'Help us improve by sharing your experience.',
      fields: [
        { type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
        { type: 'text-area', label: 'How was your experience?', placeholder: 'Tell us about your experience', required: true },
        { type: 'radio-group', label: 'Would you recommend us to others?', options: ['Yes', 'No'], required: true },
        { type: 'rating', label: 'Rate our service', max: 5, required: true },
      ],
    },
    {
      name: 'Product Review',
      description: 'Share your feedback on the product you purchased.',
      fields: [
        { type: 'text', label: 'Product Name', placeholder: 'Enter the product name', required: true },
        { type: 'number', label: 'Order Number', placeholder: 'Enter your order number', required: true },
        { type: 'dropdown', label: 'Product Category', options: ['Electronics', 'Clothing', 'Home Appliances', 'Books'], required: true },
        { type: 'rating', label: 'Rate the product', max: 5, required: true },
        { type: 'text-area', label: 'What do you like about the product?', placeholder: 'Describe what you liked', required: true },
        { type: 'text-area', label: 'What can be improved?', placeholder: 'Describe any improvements', required: false },
      ],
    },
    {
      name: 'Event Feedback',
      description: 'Tell us your thoughts on the event you attended.',
      fields: [
        { type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
        { type: 'text', label: 'Event Name', placeholder: 'Enter the event name', required: true },
        { type: 'dropdown', label: 'How did you hear about this event?', options: ['Social Media', 'Email', 'Friend', 'Website'], required: true },
        { type: 'radio-group', label: 'Was the event informative?', options: ['Yes', 'No'], required: true },
        { type: 'rating', label: 'Rate the overall event', max: 5, required: true },
        { type: 'checkbox-group', label: 'Would you attend this event again?', options: ['Yes', 'No', 'Maybe'] },
        { type: 'text-area', label: 'What was the most valuable part of the event?', placeholder: 'Share your thoughts', required: true },
      ],
    }
  ];

  // Handle form selection
  const selectFormTemplate = (template) => {
    setSelectedForm(template);
    setFields(template.fields);
    setFormName(template.name);
  };

  // Add a new field to the form
  const addNewField = () => {
    setFields([...fields, newField]);
    setNewField({ type: 'text', label: '', placeholder: '', options: [] });
  };

  // Update the new field's properties
  const handleNewFieldChange = (e) => {
    const { name, value } = e.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.post('http://localhost:5000/api/forms', {
  //       eventId,
  //       formName,
  //       fields,
  //       tableColumns,
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     console.log('Form created successfully', response.data);
  //   } catch (error) {
  //     console.error('Error saving form', error);
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.post('http://localhost:5000/api/forms', {
  //       eventId,
  //       formName,
  //       fields,
  //       tableColumns,
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log('Form created successfully', response.data);
  //   } catch (error) {
  //     if (error.response) {
  //       // Server responded with a status other than 2xx
  //       console.error('Error saving form:', error.response.data);
  //     } else if (error.request) {
  //       // Request was made but no response received
  //       console.error('No response received:', error.request);
  //     } else {
  //       // Something else triggered the error
  //       console.error('Error setting up request:', error.message);
  //     }
  //   }
  // };

  // const handleSubmit = async () => {
  //   const token = localStorage.getItem('token');
    
  //   // Log all important variables to verify their values
  //   console.log("eventId: ", eventId);
  //   console.log("formName: ", formName);
  //   console.log("fields: ", fields);
  //   console.log("tableColumns: ", tableColumns);
  
  //   const payload = {
  //     eventId: eventId, // ensure eventId is defined
  //     formName: formName, // ensure formName is a valid non-empty string
  //     fields: fields, // ensure fields array is valid and not empty
  //     tableColumns: tableColumns // ensure tableColumns is valid
  //   };
  
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/forms', payload, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log('Form created successfully', response.data);
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Error saving form:', error.response.data.message);
  //     } else {
  //       console.error('Error:', error.message);
  //     }
  //   }
  // };
  
  const generateTableColumns = (fields) => {
    return fields.map(field => field.label); // Extract labels from fields
  };
  
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    
    const generatedColumns = generateTableColumns(fields);
  
    // Log generated table columns to verify
    console.log("Generated tableColumns: ", generatedColumns);
      // Log all important variables to verify their values
    console.log("eventId: ", eventId);
    console.log("formName: ", formName);
    console.log("fields: ", fields);
   // console.log("tableColumns: ", tableColumns);
  
    const payload = {
      eventId: eventId, // ensure eventId is defined
      formName: formName, // ensure formName is a valid non-empty string
      fields: fields, // ensure fields array is valid and not empty
      tableColumns: generatedColumns // use the generated table columns
    };
  
    console.log("Payload:", payload);

    try {
      const response = await axios.post('http://localhost:5000/api/forms', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Form created successfully', response.data);
      // if (response.status === 201) {
      //   alert(`Form created! Share this link: ${response.data.link}`);
      // }
      if (response.status===201) {
        setFormLink(response.data.link); // Set the generated form link
        setModalOpen(true); // Open the modal
      } 
    }catch (error) {
      if (error.response) {
        console.error('Error saving form:', error.response.data.message);
      } else {
        console.error('Error:', error.message);
      }
    }
  };
  
  
  return (
    <div className="form-builder-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Form Templates</h2>
        <ul>
          {formTemplates.map((template, index) => (
            <li key={index} onClick={() => selectFormTemplate(template)}>
              {template.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="form-content">
        {selectedForm ? (
          <>
            <h2>{selectedForm.name}</h2>
            <p>{selectedForm.description}</p>
            <h3>Form Fields</h3>
            {fields.map((field, index) => (
              <div key={index}>
                <label>{field.label}</label>
                {field.type === 'text' && (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
                {field.type === 'email' && (
                  <input
                    type="email"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
                {field.type === 'text-area' && (
                  <textarea
                    placeholder={field.placeholder}
                    required={field.required}
                  ></textarea>
                )}
                {field.type === 'radio-group' && (
                  field.options.map((option, i) => (
                    <div key={i}>
                      <input type="radio" name={field.label} value={option} required={field.required} />
                      <label>{option}</label>
                    </div>
                  ))
                )}
                {field.type === 'dropdown' && (
                  <select required={field.required}>
                    {field.options.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                )}
                {field.type === 'rating' && (
                  <div className="rating">
                    {[...Array(field.max)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Form Field Addition */}
            <div>
              <h3>Add New Field</h3>
              <div>
                <label>Field Type</label>
                <select name="type" value={newField.type} onChange={handleNewFieldChange}>
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="text-area">Text Area</option>
                  <option value="radio-group">Radio Group</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              <div>
                <label>Label</label>
                <input
                  type="text"
                  name="label"
                  placeholder="Enter field label"
                  value={newField.label}
                  onChange={handleNewFieldChange}
                />
              </div>
              <div>
                <label>Placeholder</label>
                <input
                  type="text"
                  name="placeholder"
                  placeholder="Enter field placeholder"
                  value={newField.placeholder}
                  onChange={handleNewFieldChange}
                />
              </div>
              <button className="save-button" onClick={addNewField}>Add Field</button>
            </div>

            <button className="save-button" onClick={handleSubmit}>Save Form</button>
            <Modal 
              isOpen={modalOpen} 
              onClose={() => setModalOpen(false)} 
              link={formLink} 
            />
          </>
        ) : (
          <h2>Select a form from the sidebar</h2>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
