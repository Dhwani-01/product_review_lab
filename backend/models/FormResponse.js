// // models/FormResponse.js
// const mongoose = require('mongoose');

// const formResponseSchema = new mongoose.Schema({
//   formId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Form',
//     required: true
//   },
//   responses: mongoose.Schema.Types.Mixed, // Store flexible form responses
// }, { timestamps: true });

// module.exports = mongoose.model('FormResponse', formResponseSchema);

// models/FormResponse.js
const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  responses: [
    {
      label: { type: String, required: true },  // Matches the form field's label
      value: mongoose.Schema.Types.Mixed,       // Can be any type: string, number, array, etc.
      fieldType: { type: String, required: true } // Track the type of field (e.g., text, email, rating)
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('FormResponse', formResponseSchema);
