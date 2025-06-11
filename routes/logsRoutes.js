const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Rutas de logs funcionando' });
});

module.exports = router;
