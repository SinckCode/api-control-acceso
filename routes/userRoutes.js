const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// GET /api/users → Obtener todos los usuarios
router.get('/', (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.json(results);
    });
});

// POST /api/users → Registrar nuevo usuario
router.post('/', (req, res) => {
    const { name, rfid_uid, role } = req.body;

    if (!name || !rfid_uid || !role) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    User.create({ name, rfid_uid, role }, (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            return res.status(500).json({ error: 'Error al crear usuario' });
        }
        res.json({ message: 'Usuario creado correctamente', userId: result.insertId });
    });
});

// DELETE /api/users/:id → Eliminar usuario
router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    User.delete(userId, (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    });
});

module.exports = router;
