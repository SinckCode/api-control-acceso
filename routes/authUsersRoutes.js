const express = require('express');
const router = express.Router();
const authUsersController = require('../controllers/authUsersController');

// 📄 Obtener todos los usuarios (guardias/admins)
router.get('/', authUsersController.getAllAuthUsers);

// 🔎 Obtener usuario por ID
router.get('/:id', authUsersController.getAuthUserById);

// ➕ Crear nuevo usuario
router.post('/', authUsersController.createAuthUser);

// ✏️ Actualizar usuario
router.put('/:id', authUsersController.updateAuthUser);

// ❌ Eliminar usuario
router.delete('/:id', authUsersController.deleteAuthUser);

module.exports = router;
