const db = require('../config/database');

const ParkingStatus = {
    getStatus: (callback) => {
        const query = 'SELECT * FROM parking_status WHERE id = 1';
        db.query(query, callback);
    },

    updateStatus: (statusData, callback) => {
        const query = `
            UPDATE parking_status
            SET is_occupied = ?, is_heat_detected = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = 1
        `;
        const values = [
            statusData.is_occupied,
            statusData.is_heat_detected
        ];
        db.query(query, values, callback);
    }
};

module.exports = ParkingStatus;
