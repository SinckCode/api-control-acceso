const express = require('express');
const router = express.Router();
const authUserController = require('../controllers/authUserController');

// Login por correo (MAUI app)
router.post('/login', authUserController.loginWithEmail);

// Login por tarjeta RFID (guardias físicos)
router.post('/rfid-login', authUserController.loginWithRFID);

module.exports = router;
