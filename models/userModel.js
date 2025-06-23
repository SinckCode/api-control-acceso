const db = require('../config/database');

const User = {
    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    create: (userData, callback) => {
        const query = 'INSERT INTO users (name, rfid_uid, role) VALUES (?, ?, ?)';
        const values = [userData.name, userData.rfid_uid, userData.role];
        db.query(query, values, callback);
    },

    update: (id, userData, callback) => {
        const query = 'UPDATE users SET name = ?, rfid_uid = ?, role = ? WHERE id = ?';
        const values = [userData.name, userData.rfid_uid, userData.role, id];
        db.query(query, values, callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },

    findByRFID: (rfid_uid, callback) => {
        const query = 'SELECT * FROM users WHERE rfid_uid = ?';
        db.query(query, [rfid_uid], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    }
};

module.exports = User;
