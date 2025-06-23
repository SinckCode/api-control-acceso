const db = require('../config/database');

const Parking = {
    // Obtener todos los lugares de estacionamiento
    getAll: (callback) => {
        const query = `SELECT * FROM parking_status`;
        db.query(query, callback);
    },

    // Obtener el estado actual del estacionamiento
    getStatus: (callback) => {
        const query = `SELECT * FROM parking_status`;
        db.query(query, callback);
    },

    updateSpot: (spotId, isOccupied, callback) => {
        const query = `
            UPDATE parking_status
            SET is_occupied = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        db.query(query, [isOccupied, spotId], callback);
    },

    assignGuestSpace: (callback) => {
        const query = `
            SELECT id FROM parking_status
            WHERE is_occupied = 0 AND is_reserved = 0
            LIMIT 1
        `;

        db.query(query, (err, results) => {
            if (err) return callback(err, null);

            if (results.length === 0) return callback(null, null);

            const spaceId = results[0].id;

            const updateQuery = `
                UPDATE parking_status
                SET is_reserved = 1
                WHERE id = ?
            `;
            db.query(updateQuery, [spaceId], (errUpdate) => {
                if (errUpdate) return callback(errUpdate, null);
                callback(null, spaceId);
            });
        });
    },

    checkEmployeeSpace: (callback) => {
        const query = `
            SELECT COUNT(*) AS free_spaces
            FROM parking_status
            WHERE is_occupied = 0
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            const isFree = results[0].free_spaces > 0;
            callback(null, isFree);
        });
    },

    logAccessEvent: (userId, rfid_uid, result, notes, assignedSpace, callback) => {
        const query = `
            INSERT INTO access_logs (user_id, rfid_uid, result, notes, assigned_space)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [userId || null, rfid_uid, result, notes, assignedSpace || null];
        db.query(query, values, callback);
    },

    updateStatusById: (id, is_occupied, is_reserved, callback) => {
        const query = `
            UPDATE parking_status
            SET is_occupied = ?, is_reserved = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        db.query(query, [is_occupied, is_reserved, id], callback);
    }
};

module.exports = Parking;
