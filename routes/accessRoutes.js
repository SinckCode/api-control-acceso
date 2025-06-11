const express = require('express');
const router = express.Router();
const db = require('../config/database');
const AccessLog = require('../models/accessLogsModel');

// POST /api/access → El ESP32 manda UID
router.post('/', (req, res) => {
    const { rfid_uid } = req.body;

    if (!rfid_uid) {
        return res.status(400).json({ error: 'rfid_uid es requerido' });
    }

    // Buscar usuario
    const query = 'SELECT * FROM users WHERE rfid_uid = ?';
    db.query(query, [rfid_uid], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ error: 'Error al buscar usuario' });
        }

        let logData = {
            user_id: null,
            rfid_uid: rfid_uid,
            result: '',
            notes: '',
            assigned_space: null
        };

        if (results.length > 0) {
            // Usuario encontrado
            const user = results[0];
            logData.user_id = user.id;
            logData.result = 'granted';
            logData.notes = 'Acceso permitido';

            // Aquí podrías implementar lógica para invitados → assigned_space = 'A1' por ejemplo
            if (user.role === 'invitado') {
                logData.assigned_space = 'A1'; // ejemplo simple
            }

            // Guardar log
            AccessLog.logAccess(logData, (errLog) => {
                if (errLog) {
                    console.error('Error al guardar log:', errLog);
                }
                res.json({
                    access: 'granted',
                    role: user.role,
                    assigned_space: logData.assigned_space
                });
            });

        } else {
            // Usuario NO registrado
            logData.result = 'denied';
            logData.notes = 'Usuario no registrado';

            AccessLog.logAccess(logData, (errLog) => {
                if (errLog) {
                    console.error('Error al guardar log:', errLog);
                }
                res.json({ access: 'denied' });
            });
        }
    });
});

module.exports = router;
