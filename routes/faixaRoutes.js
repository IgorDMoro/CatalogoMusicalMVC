const express = require('express');
const router = express.Router();
const FaixaController = require('../controllers/faixaController');

router.get('/', FaixaController.listarFaixas);
router.get('/:id', FaixaController.obterFaixa);
router.post('/', FaixaController.criarFaixa);
router.put('/:id', FaixaController.atualizarFaixa);
router.delete('/:id', FaixaController.deletarFaixa);

module.exports = router;
