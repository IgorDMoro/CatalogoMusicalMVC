const express = require('express');
const router = express.Router();
const DiscoController = require('../controllers/DiscoController');

// Listar todos os discos
router.get('/', DiscoController.listarDiscos);

// Buscar um disco específico por ID
router.get('/:id', DiscoController.obterDisco);

// Criar um novo disco
router.post('/', DiscoController.criarDisco);

// Atualizar um disco existente
router.put('/:id', DiscoController.atualizarDisco);

// Deletar um disco
router.delete('/:id', DiscoController.deletarDisco);
router.post('/discos/:id/deletar', DiscoController.deletarDisco);
router.delete('/discos/:id/deletar', DiscoController.deletarDisco);

router.get('/buscar', DiscoController.buscarDiscos);
router.get('/:id/editar', DiscoController.mostrarEdicao);
router.post('/:id', DiscoController.editarDisco);

module.exports = router;
