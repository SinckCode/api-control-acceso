const AccessLog = require('../models/accessLogsModel');

const getAllLogs = (req, res) => {
    AccessLog.getAll((err, logs) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al obtener logs', error: err });
        if (!logs.length) return res.status(404).json({ success: false, message: 'No hay registros' });
        res.status(200).json({ success: true, data: logs });
    });
};

const getLogById = (req, res) => {
    const id = req.params.id;
    AccessLog.getById(id, (err, log) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al obtener log', error: err });
        if (!log) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
        res.status(200).json({ success: true, data: log });
    });
};

const createLog = (req, res) => {
    const { user_id, rfid_uid, result, notes, assigned_space } = req.body;
    AccessLog.create({ user_id, rfid_uid, result, notes, assigned_space }, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al crear log', error: err });
        res.status(201).json({ success: true, message: 'Log creado', insertId: result.insertId });
    });
};

const updateLog = (req, res) => {
    const id = req.params.id;
    const { user_id, rfid_uid, result, notes, assigned_space } = req.body;
    AccessLog.update(id, { user_id, rfid_uid, result, notes, assigned_space }, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al actualizar log', error: err });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
        res.status(200).json({ success: true, message: 'Log actualizado' });
    });
};

const deleteLog = (req, res) => {
    const id = req.params.id;
    AccessLog.delete(id, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al eliminar log', error: err });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Registro no encontrado' });
        res.status(200).json({ success: true, message: 'Log eliminado' });
    });
};

module.exports = {
    getAllLogs,
    getLogById,
    createLog,
    updateLog,
    deleteLog
};
