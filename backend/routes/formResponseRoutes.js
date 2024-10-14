// routes/formResponseRoutes.js
const express = require('express');
const { submitResponse, getResponsesByEventId} = require('../controllers/formResponseController');

const router = express.Router();


// Submit a form response
router.post('/:formId/responses', submitResponse);

router.get('/response/:eventId/responses', getResponsesByEventId);

module.exports = router;
