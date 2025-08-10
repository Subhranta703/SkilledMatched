const express = require('express');
const router = express.Router();
const { analyzeResume, getHistory } = require('../controllers/resumeController');

router.post('/analyze', analyzeResume);
router.get('/history', getHistory); // ✅ new route for dashboard

module.exports = router;
