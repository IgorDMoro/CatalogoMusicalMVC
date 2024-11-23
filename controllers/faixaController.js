const { Faixa, Disco } = require('../models');

class FaixaController {
    static async listarFaixas(req, res) {
        try {
            const faixas = await Faixa.findAll({ include: { model: Disco, as: 'disco' } });
            res.status(200).json(faixas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar faixas', details: error.message });
        }
    }

    static async obterFaixa(req, res) {
        try {
            const { id } = req.params;
            const faixa = await Faixa.findByPk(id, { include: { model: Disco, as: 'disco' } });
            if (!faixa) {
                return res.status(404).json({ error: 'Faixa não encontrada' });
            }
            res.status(200).json(faixa);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter faixa', details: error.message });
        }
    }

    static async criarFaixa(req, res) {
        try {
            const novaFaixa = await Faixa.create(req.body);
            res.status(201).json(novaFaixa);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar faixa', details: error.message });
        }
    }

    static async atualizarFaixa(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Faixa.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ error: 'Faixa não encontrada' });
            }
            res.status(200).json({ message: 'Faixa atualizada com sucesso' });
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar faixa', details: error.message });
        }
    }

    static async deletarFaixa(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Faixa.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ error: 'Faixa não encontrada' });
            }
            res.status(200).json({ message: 'Faixa deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar faixa', details: error.message });
        }
    }
}

module.exports = FaixaController;
