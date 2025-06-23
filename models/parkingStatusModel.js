const db = require('../config/database');

const ParkingStatus = {
    /**
     * Obtiene el estado completo de todos los lugares de estacionamiento.
     * @param {Function} callback
     */
    getAll: (callback) => {
        const query = 'SELECT * FROM parking_status ORDER BY id ASC';
        db.query(query, callback);
    },

    /**
     * Actualiza el estado de un lugar específico (ocupado y calor).
     * @param {number} spotId - ID del lugar.
     * @param {Object} data - Estado a actualizar.
     * @param {boolean} data.is_occupied - Si está ocupado o no.
     * @param {boolean} data.is_heat_detected - Si se detecta calor o no.
     * @param {Function} callback
     */
    updateStatus: (spotId, data, callback) => {
        const query = `
            UPDATE parking_status
            SET is_occupied = ?, is_heat_detected = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        const values = [
            data.is_occupied ? 1 : 0,
            data.is_heat_detected ? 1 : 0,
            spotId
        ];
        db.query(query, values, callback);
    },

    /**
     * Libera manualmente un lugar de estacionamiento (is_occupied e is_reserved).
     * @param {number} id
     * @param {Object} data
     * @param {boolean} data.is_occupied
     * @param {boolean} data.is_reserved
     * @param {Function} callback
     */
    releaseSpot: (id, data, callback) => {
        const query = `
            UPDATE parking_status
            SET is_occupied = ?, is_reserved = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        const values = [
            data.is_occupied ? 1 : 0,
            data.is_reserved ? 1 : 0,
            id
        ];
        db.query(query, values, callback);
    }
};

module.exports = ParkingStatus;
