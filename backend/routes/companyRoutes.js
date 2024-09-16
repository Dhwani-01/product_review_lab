const express = require('express');
const { registerCompany, authCompany } = require('../controllers/companyController');
const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', authCompany);

module.exports = router;
