// routes/pluma2Routes.js
const express = require('express');
const router = express.Router();
const pluma2Controller = require('../controllers/pluma2Controller');

router.post('/open', pluma2Controller.openPluma2);
router.post('/close', pluma2Controller.closePluma2);
router.get('/status', pluma2Controller.getPluma2Status); // opcional

module.exports = router;
