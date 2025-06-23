const express = require('express');
const router = express.Router();
const plumaController = require('../controllers/plumaController');

router.post('/open', plumaController.openPluma);
router.post('/close', plumaController.closePluma);
router.get('/status', plumaController.getPlumaStatus); // opcional

module.exports = router;
