// src/routes/veterinariosRoutes.js
const express = require('express');
const router = express.Router();
const veterinariosController = require('../controllers/veterinariosController');
// Rota para obter todos os veterinários (GET)
router.get('/', veterinariosController.getAll);
// Rota para obter um veterinário pelo ID (GET)
router.get('/:id', veterinariosController.getById);
// Rota para criar um novo veterinário (POST)
router.post('/', veterinariosController.create);
// Rota para atualizar um veterinário existente (PUT)
router.put('/:id', veterinariosController.update);
// Rota para excluir um veterinário (DELETE)
router.delete('/:id', veterinariosController.remove);
module.exports = router;