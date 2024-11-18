const express = require('express');
const router = express.Router();
const ArtistaController = require('../controllers/artistaController');

router.get('/', ArtistaController.listarArtistas);
router.get('/:id', ArtistaController.obterArtista);
router.post('/', ArtistaController.criarArtista);
router.put('/:id', ArtistaController.atualizarArtista);
router.delete('/:id', ArtistaController.deletarArtista);

module.exports = router;
