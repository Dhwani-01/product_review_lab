// routes/formRoutes.js
const express = require('express');
const { createForm, getFormByEventId, getFormById } = require('../controllers/formController');
const { submitResponse } = require('../controllers/formResponseController');

const router = express.Router();

// Create a new form for an event
router.post('/', createForm);

// Submit a form response
//router.post('/:formId/responses', submitResponse);

router.get('/event/:id', getFormByEventId); 

router.get('/:id',getFormById);

module.exports = router;
