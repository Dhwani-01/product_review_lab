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
  console.log("SUBMIT  RESPONSE")
  const { formId, responses, userId } = req.body;
  console.log("formID",formId)
  console.log("response backend",responses)

  try {
    // Find the associated form to get the eventId
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Extract eventId from the form
    console.log("FORM SUBMISSION",form)
    const eventId = form.eventId;
    console.log("EVENT ID",eventId)
    // Create the new response object
    // const newResponse = new FormResponse({
    //   formId,
    //   eventId,
    //   //userId, // Optional: Include this if you're tracking users
    //   responses
    // });

    const formattedResponses = Object.keys(responses).map((key) => {
      let fieldType = 'text'; // Default field type

      // Determine field type based on the original form definition
      const field = form.fields.find(f => f.label === key);
      if (field) {
        fieldType = field.type; // Use the type from the form definition
      }

      return {
        label: key,
        value: responses[key],
        fieldType: fieldType
      };
    });

    // Create the new response object
    const newResponse = new FormResponse({
      formId,
      eventId,
      responses: formattedResponses
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

const getResponsesByEventId = async (req, res) => {
  const { eventId } = req.params;  // Get eventId from request params

  try {
    // Find all responses with the given eventId
    const responses = await FormResponse.find({ eventId }).populate('formId', 'formName');

    if (!responses || responses.length === 0) {
      return res.status(404).json({ message: 'No responses found for this event' });
    }

    // Return the responses
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'Error fetching responses', error });
  }
};

module.exports = { submitResponse, getResponsesByEventId };
