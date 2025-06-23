const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

// Obtener el estado de todos los lugares
router.get('/status', parkingController.getStatus);

// Obtener todos los espacios de estacionamiento
router.get('/spaces', parkingController.getAllSpaces);

// Actualizar estado de un lugar específico
router.patch('/status/:id', parkingController.updateStatus);

module.exports = router;
