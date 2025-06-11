const express = require('express');
const router = express.Router();
const AccessLog = require('../models/accessLogsModel');

// GET /api/access_logs → obtener historial completo
router.get('/', (req, res) => {
    AccessLog.getAll((err, results) => {
        if (err) {
            console.error('Error al obtener access_logs:', err);
            return res.status(500).json({ error: 'Error al obtener access_logs' });
        }
        res.json(results);
    });
});

module.exports = router;
