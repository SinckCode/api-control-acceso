const User = require('../models/userModel');
const AuthUser = require('../models/authUserModel');
const Parking = require('../models/parkingModel');
const AccessLogs = require('../models/accessLogsModel');

// ✅ Controlador principal de acceso de empleados/invitados registrados en USERS
const registrarAcceso = (req, res) => {
    const { rfid_uid } = req.body;

    if (!rfid_uid) {
        return res.status(400).json({ success: false, message: 'RFID UID es requerido' });
    }

    User.findByRFID(rfid_uid, (err, user) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }

        if (!user) {
            Parking.logAccessEvent(null, rfid_uid, 'denied', 'Usuario no registrado', null, () => {
                return res.status(401).json({ success: false, message: 'Acceso denegado: Usuario no registrado' });
            });
            return;
        }

        if (user.role === 'invitado') {
            Parking.assignGuestSpace((errAssign, spaceId) => {
                if (errAssign || !spaceId) {
                    Parking.logAccessEvent(user.id, rfid_uid, 'denied', 'Sin espacios para invitados', null, () => {
                        return res.status(403).json({ success: false, message: 'No hay espacios disponibles para invitados' });
                    });
                    return;
                }

                Parking.logAccessEvent(user.id, rfid_uid, 'granted', 'Acceso como invitado', spaceId, () => {
                    return res.status(200).json({
                        success: true,
                        message: 'Acceso concedido a invitado',
                        usuario: user,
                        espacio_asignado: spaceId
                    });
                });
            });

        } else if (user.role === 'empleado') {
            Parking.checkEmployeeSpace((errCheck, isAvailable) => {
                if (errCheck || !isAvailable) {
                    Parking.logAccessEvent(user.id, rfid_uid, 'denied', 'Sin espacios disponibles para empleados', null, () => {
                        return res.status(403).json({ success: false, message: 'No hay espacios disponibles para empleados' });
                    });
                    return;
                }

                Parking.logAccessEvent(user.id, rfid_uid, 'granted', 'Acceso como empleado', null, () => {
                    return res.status(200).json({
                        success: true,
                        message: 'Acceso concedido a empleado',
                        usuario: user,
                        espacio_asignado: null
                    });
                });
            });

        } else {
            Parking.logAccessEvent(user.id, rfid_uid, 'denied', 'Rol no autorizado', null, () => {
                return res.status(403).json({ success: false, message: 'Rol no autorizado' });
            });
        }
    });
};

// ✅ Acceso con AUTH_USERS (guardias/admins) — fusionado desde authController.js
const registrarAccesoPorRFIDAuthUser = (req, res) => {
    const { rfid_uid } = req.body;

    if (!rfid_uid) {
        return res.status(400).json({ success: false, message: 'Se requiere el UID del RFID' });
    }

    AuthUser.findByRFID(rfid_uid, (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error en la autenticación', error: err });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado o no autorizado' });
        }

        if (user.role === 'invitado') {
            Parking.assignGuestSpace((err, assignedSpace) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error asignando espacio', error: err });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Acceso permitido - Invitado',
                    user: {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    },
                    assigned_space: assignedSpace,
                    led_color: 'yellow',
                    raise_gate: true
                });
            });
        } else {
            Parking.checkEmployeeSpace((err, isFree) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error verificando espacio', error: err });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Acceso permitido - Empleado',
                    user: {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    },
                    space_available: isFree,
                    led_color: isFree ? 'green' : 'red',
                    raise_gate: isFree
                });
            });
        }
    });
};

// ✅ Registrar acceso denegado manualmente (por UID no registrado)
const registrarAccesoDenegado = (req, res) => {
    const { rfid_uid } = req.body;

    if (!rfid_uid) {
        return res.status(400).json({ success: false, message: 'RFID UID es requerido' });
    }

    Parking.logAccessEvent(null, rfid_uid, 'denied', 'Acceso denegado manual', null, () => {
        return res.status(200).json({
            success: true,
            message: 'Acceso denegado registrado correctamente',
            rfid_uid
        });
    });
};

// ✅ Obtener todos los logs
const obtenerLogs = (req, res) => {
    AccessLogs.getAll((err, logs) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al obtener logs', error: err });
        }
        res.status(200).json({ success: true, logs });
    });
};

// ✅ Registrar invitados desde app
const registrarInvitadoDesdeApp = (req, res) => {
    const { nombre, empresa, motivo, rfid_uid } = req.body;

    if (!nombre || !empresa || !motivo || !rfid_uid) {
        return res.status(400).json({
            success: false,
            message: 'Faltan campos obligatorios (nombre, empresa, motivo, rfid_uid)'
        });
    }

    const nuevoInvitado = {
        name: nombre,
        rfid_uid,
        role: 'invitado'
    };

    User.create(nuevoInvitado, (err, userId) => {
        if (err) {
            console.error('Error al registrar invitado:', err);
            return res.status(500).json({
                success: false,
                message: 'Error al registrar invitado'
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Invitado registrado exitosamente',
            id: userId
        });
    });
};

module.exports = {
    registrarAcceso,
    registrarAccesoPorRFIDAuthUser,
    registrarAccesoDenegado,
    obtenerLogs,
    registrarInvitadoDesdeApp
};
