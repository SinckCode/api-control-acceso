const db = require('../config/database');

const AccessLog = {
    getAll: (callback) => {
        const query = `
            SELECT al.*, u.name, u.role
            FROM access_logs al
            LEFT JOIN users u ON al.user_id = u.id
            ORDER BY al.timestamp DESC
        `;
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `
            SELECT al.*, u.name, u.role
            FROM access_logs al
            LEFT JOIN users u ON al.user_id = u.id
            WHERE al.id = ?
        `;
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },

    create: (logData, callback) => {
        const query = `
            INSERT INTO access_logs (user_id, rfid_uid, result, notes, assigned_space)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            logData.user_id || null,
            logData.rfid_uid || 'MANUAL',
            logData.result || 'Acceso no especificado',
            logData.notes || 'Sin notas',
            logData.assigned_space || null
        ];

        db.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    update: (id, logData, callback) => {
        const query = `
            UPDATE access_logs
            SET user_id = ?, rfid_uid = ?, result = ?, notes = ?, assigned_space = ?
            WHERE id = ?
        `;
        const values = [
            logData.user_id || null,
            logData.rfid_uid,
            logData.result,
            logData.notes,
            logData.assigned_space,
            id
        ];
        db.query(query, values, callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM access_logs WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = AccessLog;
