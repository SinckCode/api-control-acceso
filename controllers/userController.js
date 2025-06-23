const User = require('../models/userModel');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: err });
        }
        res.status(200).json({ success: true, data: users });
    });
};

// Obtener usuario por ID
const getUserById = (req, res) => {
    const userId = req.params.id;

    User.getById(userId, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al buscar usuario', error: err });
        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        res.status(200).json({ success: true, data: user });
    });
};

// Crear un nuevo usuario
const createUser = (req, res) => {
    const { name, rfid_uid, role } = req.body;

    if (!name || !rfid_uid || !role) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    User.create({ name, rfid_uid, role }, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al crear usuario', error: err });
        }
        res.status(201).json({ success: true, message: 'Usuario creado correctamente', data: result });
    });
};

// Actualizar usuario por ID
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, rfid_uid, role } = req.body;

    if (!name || !rfid_uid || !role) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    const updatedUser = { name, rfid_uid, role };

    User.update(userId, updatedUser, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: err });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        res.status(200).json({ success: true, message: 'Usuario actualizado correctamente' });
    });
};

// Eliminar usuario
const deleteUser = (req, res) => {
    const userId = req.params.id;

    User.delete(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al eliminar usuario', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
