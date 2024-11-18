class GeneroController {
    static listarGeneros(req, res) {
        // Lógica para listar todos os gêneros
        res.send('Lista de gêneros');
    }

    static obterGenero(req, res) {
        const { id } = req.params;
        // Lógica para buscar um gênero específico por ID
        res.send(`Detalhes do gênero com ID: ${id}`);
    }

    static criarGenero(req, res) {
        const novoGenero = req.body;
        // Lógica para criar um novo gênero
        res.send(`Gênero criado: ${JSON.stringify(novoGenero)}`);
    }

    static atualizarGenero(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        // Lógica para atualizar um gênero existente
        res.send(`Gênero com ID ${id} atualizado com: ${JSON.stringify(dadosAtualizados)}`);
    }

    static deletarGenero(req, res) {
        const { id } = req.params;
        // Lógica para deletar um gênero
        res.send(`Gênero com ID ${id} deletado`);
    }
}

module.exports = GeneroController;
