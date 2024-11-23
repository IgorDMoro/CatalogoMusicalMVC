const { Genero } = require('../models');

class GeneroController {
  static async listarGeneros(req, res) {
    try {
      const generos = await Genero.findAll();
      res.json(generos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar gêneros' });
    }
  }

  static async obterGenero(req, res) {
    try {
      const { id } = req.params;
      const genero = await Genero.findByPk(id);
      if (!genero) {
        return res.status(404).json({ error: 'Gênero não encontrado' });
      }
      res.json(genero);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter gênero' });
    }
  }

  static async criarGenero(req, res) {
    try {
      const novoGenero = await Genero.create(req.body);
      res.status(201).json(novoGenero);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar gênero' });
    }
  }

  static async atualizarGenero(req, res) {
    try {
      const { id } = req.params;
      const genero = await Genero.findByPk(id);
      if (!genero) {
        return res.status(404).json({ error: 'Gênero não encontrado' });
      }
      await genero.update(req.body);
      res.json(genero);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar gênero' });
    }
  }

  static async deletarGenero(req, res) {
    try {
      const { id } = req.params;
      const genero = await Genero.findByPk(id);
      if (!genero) {
        return res.status(404).json({ error: 'Gênero não encontrado' });
      }
      await genero.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar gênero' });
    }
  }
}

module.exports = GeneroController;
