const AuthUser = require('../models/authUserModel');

// Obtener todos
const getAllAuthUsers = (req, res) => {
    AuthUser.getAll((err, users) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: err });
        res.status(200).json({ success: true, data: users });
    });
};

// Obtener uno por ID
const getAuthUserById = (req, res) => {
    const id = req.params.id;
    AuthUser.getById(id, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al obtener usuario', error: err });
        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        res.status(200).json({ success: true, data: user });
    });
};

// Crear usuario con validación de duplicados
const createAuthUser = (req, res) => {
    const { name, email, password, rol, rfid_uid } = req.body;
    if (!name || !email || !password || !rol) {
        return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
    }

    // Validar email duplicado
    AuthUser.findByEmail(email, (err, existingUser) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al validar email', error: err });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Ya existe un usuario con este correo' });
        }

        // Validar UID duplicado (si se envía)
        if (rfid_uid) {
            AuthUser.findByRFID(rfid_uid, (err, existingUID) => {
                if (err) return res.status(500).json({ success: false, message: 'Error al validar UID', error: err });
                if (existingUID) {
                    return res.status(409).json({ success: false, message: 'Ya existe un usuario con este UID' });
                }

                // Crear usuario
                AuthUser.create({ name, email, password, rol, rfid_uid }, (err, result) => {
                    if (err) return res.status(500).json({ success: false, message: 'Error al crear usuario', error: err });
                    res.status(201).json({ success: true, message: 'Usuario creado', insertId: result.insertId });
                });
            });
        } else {
            // Crear usuario sin UID
            AuthUser.create({ name, email, password, rol, rfid_uid: null }, (err, result) => {
                if (err) return res.status(500).json({ success: false, message: 'Error al crear usuario', error: err });
                res.status(201).json({ success: true, message: 'Usuario creado', insertId: result.insertId });
            });
        }
    });
};

// Actualizar usuario
const updateAuthUser = (req, res) => {
    const id = req.params.id;
    const { name, email, password, rol, rfid_uid } = req.body;
    if (!name || !email || !password || !rol) {
        return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
    }

    AuthUser.update(id, { name, email, password, rol, rfid_uid }, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: err });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        res.status(200).json({ success: true, message: 'Usuario actualizado correctamente' });
    });
};

// Eliminar usuario
const deleteAuthUser = (req, res) => {
    const id = req.params.id;
    AuthUser.delete(id, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al eliminar usuario', error: err });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
    });
};

module.exports = {
    getAllAuthUsers,
    getAuthUserById,
    createAuthUser,
    updateAuthUser,
    deleteAuthUser
};
