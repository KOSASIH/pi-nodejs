const express = require('express');
const { sendPiCurrency, transactionHistory } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have JWT middleware
const router = express.Router();

router.post('/send', authMiddleware, sendPiCurrency);
router.get('/history', authMiddleware, transactionHistory);

module.exports = router;
