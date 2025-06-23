const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');

/**
 * POST /api/access/
 * Endpoint que el ESP32 llama cuando escanea un RFID.
 * Registra el intento de acceso (permitido o denegado).
 */
router.post('/', accessController.registrarAcceso);

/**
 * GET /api/access/logs
 * La app MAUI puede usar este endpoint para obtener el historial completo de accesos.
 */
router.get('/logs', accessController.obtenerLogs);
// POST /api/access/denied
router.post('/denied', accessController.registrarAccesoDenegado);
/**
 * POST /api/access/invite
 * La app puede registrar invitados manualmente, enviando sus datos (nombre, empresa, motivo, etc.).
 */
router.post('/invite', accessController.registrarInvitadoDesdeApp);

router.post('/auth-user', accessController.registrarAccesoPorRFIDAuthUser);


module.exports = router;
