const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Rutas de access funcionando' });
});

module.exports = router;
