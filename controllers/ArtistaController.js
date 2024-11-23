const { Artista } = require('../models'); // Importa o modelo Artista

class ArtistaController {
    static async listarArtistas(req, res) {
        try {
            const artistas = await Artista.findAll(); // Busca todos os artistas
            res.status(200).json(artistas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar artistas', details: error.message });
        }
    }

    static async obterArtista(req, res) {
        try {
            const { id } = req.params;
            const artista = await Artista.findByPk(id); // Busca artista pelo ID
            if (!artista) {
                return res.status(404).json({ error: 'Artista não encontrado' });
            }
            res.status(200).json(artista);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter artista', details: error.message });
        }
    }

    static async criarArtista(req, res) {
        try {
            const novoArtista = await Artista.create(req.body); // Cria um novo artista
            res.status(201).json(novoArtista);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar artista', details: error.message });
        }
    }

    static async atualizarArtista(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Artista.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ error: 'Artista não encontrado' });
            }
            res.status(200).json({ message: 'Artista atualizado com sucesso' });
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar artista', details: error.message });
        }
    }

    static async deletarArtista(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Artista.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ error: 'Artista não encontrado' });
            }
            res.status(200).json({ message: 'Artista deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar artista', details: error.message });
        }
    }
}

module.exports = ArtistaController;
