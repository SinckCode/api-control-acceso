const AuthUser = require('../models/authUserModel');
const User = require('../models/userModel');

// 🔐 Login por correo y contraseña (para app MAUI)
const loginWithEmail = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Correo y contraseña requeridos' });
    }

    AuthUser.findByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: 'Error del servidor', error: err });
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            usuario: {
                id: user.id,
                name: user.name,
                rol: user.rol,
                email: user.email
            }
        });
    });
};

// 📛 Login por UID RFID (usuarios que ingresan con vehículo)
const loginWithRFID = (req, res) => {
    const { rfid_uid } = req.body;

    if (!rfid_uid) {
        return res.status(400).json({ success: false, message: 'RFID UID es requerido' });
    }

    User.findByRFID(rfid_uid, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: 'Error del servidor', error: err });
        if (!user) return res.status(401).json({ success: false, message: 'Acceso denegado: Usuario no registrado' });

        res.status(200).json({
            success: true,
            message: 'Acceso concedido',
            usuario: {
                id: user.id,
                name: user.name,
                role: user.role,
                rfid_uid: user.rfid_uid
            }
        });
    });
};

module.exports = {
    loginWithEmail,
    loginWithRFID
};
