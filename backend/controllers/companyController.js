const Company = require('../models/Company');
const jwt = require('jsonwebtoken');

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

module.exports = { registerCompany, authCompany };
