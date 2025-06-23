const express = require('express');
const router = express.Router();
const {
    getAllLogs,
    getLogById,
    createLog,
    updateLog,
    deleteLog
} = require('../controllers/logsController');

router.get('/', getAllLogs);
router.get('/:id', getLogById);
router.post('/', createLog);
router.put('/:id', updateLog);
router.delete('/:id', deleteLog);

module.exports = router;
