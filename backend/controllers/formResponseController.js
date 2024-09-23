// // controllers/formResponseController.js
// const FormResponse = require('../models/FormResponse');

// const submitResponse = async (req, res) => {
//   const { formId, responses } = req.body;

//   try {
//     const newResponse = new FormResponse({
//       formId,
//       responses,
//     });

//     await newResponse.save();
//     res.status(201).json({ message: 'Response submitted successfully', response: newResponse });
//   } catch (error) {
//     res.status(500).json({ message: 'Error submitting response', error });
//   }
// };

// module.exports = { submitResponse };

const FormResponse = require('../models/FormResponse');
const Form = require('../models/Form');

const submitResponse = async (req, res) => {
  const { formId, responses, userId } = req.body;

  try {
    // Find the associated form to get the eventId
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Extract eventId from the form
    const eventId = form.eventId;

    // Create the new response object
    const newResponse = new FormResponse({
      formId,
      eventId,
      userId, // Optional: Include this if you're tracking users
      responses
    });

    // Save the response to the database
    await newResponse.save();

    // Respond with success and the new response object
    res.status(201).json({ message: 'Response submitted successfully', response: newResponse });
  } catch (error) {
    // Handle errors and return a failure response
    res.status(500).json({ message: 'Error submitting response', error });
  }
};

module.exports = { submitResponse };
