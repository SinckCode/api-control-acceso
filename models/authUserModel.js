const db = require('../config/database');

const AuthUser = {
    // ✅ Login por email
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM auth_users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    // ✅ CRUD: Obtener todos los usuarios
    getAll: (callback) => {
        const query = 'SELECT id, name, email, rol, created_at FROM auth_users';
        db.query(query, callback);
    },

    // ✅ CRUD: Obtener usuario por ID
    getById: (id, callback) => {
        const query = 'SELECT id, name, email, rol, created_at FROM auth_users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    // ✅ CRUD: Crear nuevo usuario
    create: (userData, callback) => {
        const query = 'INSERT INTO auth_users (name, email, password, rol) VALUES (?, ?, ?, ?)';
        const values = [
            userData.name,
            userData.email,
            userData.password,
            userData.rol || 'guardia'
        ];
        db.query(query, values, callback);
    },

    // ✅ CRUD: Actualizar usuario existente
    update: (id, userData, callback) => {
        const query = 'UPDATE auth_users SET name = ?, email = ?, password = ?, rol = ? WHERE id = ?';
        const values = [
            userData.name,
            userData.email,
            userData.password,
            userData.rol,
            id
        ];
        db.query(query, values, callback);
    },

    // ✅ CRUD: Eliminar usuario
    delete: (id, callback) => {
        const query = 'DELETE FROM auth_users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = AuthUser;
