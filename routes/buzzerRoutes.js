const express = require('express');
const router = express.Router();
const buzzerController = require('../controllers/buzzerController');

router.post('/play', buzzerController.playBuzzer);
router.get('/status', buzzerController.getBuzzerStatus);

module.exports = router;
