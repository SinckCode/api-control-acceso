const db = require('../config/database');

const AccessLog = {
    logAccess: (data, callback) => {
        const query = `
            INSERT INTO access_logs (user_id, rfid_uid, result, notes, assigned_space)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            data.user_id,
            data.rfid_uid,
            data.result,
            data.notes,
            data.assigned_space || null
        ];
        db.query(query, values, callback);
    },

    getAll: (callback) => {
        const query = `
            SELECT access_logs.*, users.name, users.role
            FROM access_logs
            LEFT JOIN users ON access_logs.user_id = users.id
            ORDER BY timestamp DESC
        `;
        db.query(query, callback);
    }
};

module.exports = AccessLog;
