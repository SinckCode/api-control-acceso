const express = require('express');
const router = express.Router();

// Ruta de prueba
router.get('/', (req, res) => {
    res.json({ message: 'Rutas de usuarios funcionando' });
});

module.exports = router;
