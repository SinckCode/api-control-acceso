const express = require('express');
const router = express.Router();
const ParkingStatus = require('../models/parkingStatusModel');

// GET /api/parking/status → obtener estado actual
router.get('/', (req, res) => {
    ParkingStatus.getStatus((err, results) => {
        if (err) {
            console.error('Error al obtener parking status:', err);
            return res.status(500).json({ error: 'Error al obtener parking status' });
        }
        res.json(results[0]);
    });
});

// POST /api/parking/status → actualizar estado (ESP32 lo manda)
router.post('/', (req, res) => {
    const { is_occupied, is_heat_detected } = req.body;

    if (typeof is_occupied === 'undefined' || typeof is_heat_detected === 'undefined') {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const statusData = {
        is_occupied: is_occupied ? 1 : 0,
        is_heat_detected: is_heat_detected ? 1 : 0
    };

    ParkingStatus.updateStatus(statusData, (err) => {
        if (err) {
            console.error('Error al actualizar parking status:', err);
            return res.status(500).json({ error: 'Error al actualizar parking status' });
        }
        res.json({ message: 'Parking status actualizado correctamente' });
    });
});

module.exports = router;
