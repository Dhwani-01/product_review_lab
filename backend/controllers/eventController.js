const Event = require('../models/Event');

const createEvent = async (req, res) => {
    try {
      const { name, date, details } = req.body;
      
      if (!req.company_id) {
        return res.status(400).json({ message: 'Company ID is missing' });
      }
  
      const event = new Event({
        name,
        date,
        details,
        company_id: req.company_id
      });
  
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Failed to create event' });
    }
  };

// Get events by company ID
const getEventsByCompany = async (req, res) => {
    try {
        const companyId = req.company_id;  // Ensure this is properly retrieved from the token
        if (!companyId) {
          return res.status(400).json({ message: 'Company ID is missing' });
        }
    
        const events = await Event.find({ company_id: companyId });
        if (!events) {
          return res.status(404).json({ message: 'No events found for this company' });
        }
    
        res.status(200).json(events);
      } catch (error) {
        console.error('Error fetching company events:', error);  // This will print the actual error to the console
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

module.exports = {
  createEvent,
  getEventsByCompany
};
