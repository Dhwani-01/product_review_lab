const express = require('express');
const { registerCompany, authCompany, getCompanyByToken } = require('../controllers/companyController');
const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', authCompany);

router.get('/me', getCompanyByToken);


module.exports = router;
