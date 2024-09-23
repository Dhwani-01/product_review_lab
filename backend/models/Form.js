// // models/Form.js
// const mongoose = require('mongoose');

// const formSchema = new mongoose.Schema({
//   eventId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Event',
//     required: true
//   },
//   formName: {
//     type: String,
//     required: true
//   },
//   fields: [
//     {
//       type: String,
//       label: String
//     }
//   ],
//   tableColumns: [String], // Store the names of the table columns
// }, { timestamps: true });

// module.exports = mongoose.model('Form', formSchema);

// models/Form.js

const mongoose = require('mongoose');

// Define the schema for each form field
const formFieldSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true 
    // e.g., 'text', 'email', 'text-area', 'radio-group', 'dropdown', 'rating'
  },
  label: { 
    type: String, 
    required: true 
  },
  placeholder: { 
    type: String 
  },
  required: { 
    type: Boolean, 
    default: false 
  },
  options: [String], // Used for fields like 'radio-group' or 'dropdown' to store available options
  max: { 
    type: Number // Used for fields like 'rating' to define the max rating value
  }
}, { _id: false });

// Define the form schema
const formSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  formName: {
    type: String,
    required: true
  },
  link: { type: String, unique: true },
  fields: [formFieldSchema], // Array of form fields, as defined by the schema above
  tableColumns: [String], // Store the names of the table columns, which can be derived from the field labels
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
