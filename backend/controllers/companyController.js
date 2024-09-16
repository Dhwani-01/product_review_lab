const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
// const config = require('config');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new company
const registerCompany = async (req, res) => {
  const { name, type, year_of_establishment, other_detail, password } = req.body;

  const companyExists = await Company.findOne({ name });

  if (companyExists) {
    return res.status(400).json({ message: 'Company already exists' });
  }

  const company = await Company.create({
    name,
    type,
    year_of_establishment,
    other_detail,
    password,
  });

  if (company) {
    res.status(201).json({
      _id: company._id,
      name: company.name,
      token: generateToken(company._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid company data' });
  }
};

// Login company
const authCompany = async (req, res) => {
  const { name, password } = req.body;

  const company = await Company.findOne({ name });

  if (company && (await company.matchPassword(password))) {
    res.json({
      _id: company._id,
      name: company.name,
      token: generateToken(company._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const getCompanyByToken = async (req, res) => {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Token required' });
  
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
  
        const company = await Company.findById(decoded.id); // Assuming the token has the company ID
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
      });
    } catch (error) {
      console.error('Error fetching company:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { registerCompany, authCompany, getCompanyByToken };
