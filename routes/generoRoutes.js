const express = require('express');
const router = express.Router();
const GeneroController = require('../controllers/GeneroController');

router.get('/', GeneroController.listarGeneros);
router.get('/:id', GeneroController.obterGenero);
router.post('/', GeneroController.criarGenero);
router.put('/:id', GeneroController.atualizarGenero);
router.delete('/:id', GeneroController.deletarGenero);

module.exports = router;
