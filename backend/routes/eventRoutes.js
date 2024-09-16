const express = require('express');
const router = express.Router();
const { createEvent, getEventsByCompany } = require('../controllers/eventController');
const protect = require('../middleware/auth');
const extractCompanyId = require('../middleware/auth');
// Create a new event (protected route)
router.post('/', protect, extractCompanyId, createEvent);

// Get events by company ID (protected route)
router.get('/company-events', protect, extractCompanyId, getEventsByCompany);

module.exports = router;
