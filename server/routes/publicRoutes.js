const express = require('express');
const router = express.Router();
const { getPublicSettings, getDanceStyles, getFaqs, submitApplication, submitContact, loginAdmin } = require('../controllers/publicController');

router.get('/settings/public', getPublicSettings);
router.get('/dance-styles', getDanceStyles);
router.get('/faqs', getFaqs);
router.post('/applications', submitApplication);
router.post('/contact', submitContact);
router.post('/admin/login', loginAdmin);

module.exports = router;
