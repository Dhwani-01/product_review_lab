const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.company = await Company.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;


const extractCompanyId = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        if (decoded && decoded.id) {
          req.company_id = decoded.id; // Add company_id to the request object
          console.log('Decoded Token:', decoded);
          console.log('Company ID:', req.company_id);

          next();
        } else {
          res.status(401).json({ message: 'Token is invalid' });
        }
      } catch (error) {
        console.error('Error in extractCompanyId middleware:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  
  module.exports = extractCompanyId;