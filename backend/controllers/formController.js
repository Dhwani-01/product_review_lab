// // controllers/formController.js
// const Form = require('../models/Form');

// const createForm = async (req, res) => {
//   const { eventId, formName, fields, tableColumns } = req.body;

//   try {
//     const newForm = new Form({
//       eventId,
//       formName,
//       fields,
//       tableColumns,
//     });

//     await newForm.save();
//     res.status(201).json({ message: 'Form created successfully', form: newForm });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating form', error });
//   }
// };

// module.exports = { createForm };

// controllers/formController.js
const Form = require('../models/Form');

const mongoose = require('mongoose');

// Create a new form
const createForm = async (req, res) => {
  const { eventId, formName,  fields, tableColumns } = req.body;

  // Validate fields structure
  if (!eventId || !formName  || !fields || !Array.isArray(fields) || fields.length === 0) {
    
    return res.status(400).json({ message: 'Missing required fields or fields structure is incorrect.' });
  }

  try {
    // Create a new form document
    //const formId = new mongoose.Types.ObjectId(); // Create a unique ID
    //const formLink = `http://localhost:3000/forms/${formId}`; 

    const newForm = new Form({
      eventId,
      formName,
      fields, // Ensure fields match the structure defined in the model
      tableColumns, // Table columns derived from field labels
    });

    // Save the form to the database
    await newForm.save();
    
    
    //const formLink = `http://localhost:3000/forms/${newForm._id}`; // Generate link
    const formLink = `/forms/${newForm._id}`; 

    newForm.link = formLink;
    await newForm.save(); // Save again with the updated link

    res.status(201).json({ message: 'Form created successfully', form: newForm, link: formLink });
    // Return success response
   // res.status(201).json({ message: 'Form created successfully', form: newForm });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ message: 'Error creating form', error });
  }
};

const getFormByEventId = async (req, res) => {
  const { id } = req.params; // Event ID passed in the URL
  try {
    const forms = await Form.find({ eventId: id }); // Find forms related to the event ID
    console.log(forms)
    if (!forms || forms.length === 0) {
      return res.status(404).json({ message: 'No forms found for this event.' });
    }
    res.status(200).json(forms); // Return all forms related to the event
  } catch (error) {
    console.error('Error fetching forms by event ID:', error);
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
};


const getFormById = async (req, res) => {
  console.log('getFormBYID function called'); 
  const formId = req.params.id;

  try {
    const form = await Form.findById(formId);
    console.log(form)
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ message: 'Error fetching form', error: error.message });
  }
};

module.exports = { createForm, getFormByEventId, getFormById };

