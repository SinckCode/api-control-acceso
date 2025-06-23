const Parking = require('../models/parkingModel');
const AccessLog = require('../models/accessLogsModel'); // <- nombre corregido

// Obtener el estado actual del estacionamiento
const getStatus = (req, res) => {
    Parking.getStatus((err, status) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el estado del estacionamiento',
                error: err
            });
        }
        res.status(200).json({ success: true, status });
    });
};

// Actualizar el estado del lugar y registrar el log
const updateStatus = (req, res) => {
    const { is_occupied, is_reserved } = req.body;
    const spotId = req.params.id;

    if (typeof is_occupied === 'undefined' || typeof is_reserved === 'undefined') {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: is_occupied o is_reserved'
        });
    }

    Parking.updateStatusById(spotId, is_occupied, is_reserved, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al actualizar el estado del lugar',
                error: err
            });
        }

        const logData = {
            user_id: null,
            rfid_uid: 'MANUAL', // valor fijo para evitar error por NULL
            result: is_occupied ? 'Espacio ocupado manualmente' : 'Espacio liberado manualmente',
            notes: 'Actualización manual desde app',
            assigned_space: parseInt(spotId)
        };

        AccessLog.create(logData, (logErr) => {
            if (logErr) {
                console.error('Error al registrar log:', logErr);
                return res.status(500).json({
                    success: false,
                    message: 'Lugar actualizado, pero no se pudo registrar el log'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Estado actualizado y log registrado correctamente'
            });
        });
    });
};

// Obtener todos los lugares de estacionamiento
const getAllSpaces = (req, res) => {
    Parking.getAll((err, spaces) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener los lugares de estacionamiento',
                error: err
            });
        }
        res.status(200).json({ success: true, espacios: spaces });
    });
};


module.exports = {
    getStatus,
    updateStatus,
    getAllSpaces
};
