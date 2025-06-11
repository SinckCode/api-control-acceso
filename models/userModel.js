const db = require('../config/database');

const User = {
    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, callback);
    },

    create: (userData, callback) => {
        const query = 'INSERT INTO users (name, rfid_uid, role) VALUES (?, ?, ?)';
        const values = [userData.name, userData.rfid_uid, userData.role];
        db.query(query, values, callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = User;
