class DiscoController {
    static listarDiscos(req, res) {
        // Lógica para listar todos os discos
        res.send('Lista de discos');
    }

    static obterDisco(req, res) {
        const { id } = req.params;
        // Lógica para buscar um disco específico por ID
        res.send(`Detalhes do disco com ID: ${id}`);
    }

    static criarDisco(req, res) {
        const novoDisco = req.body;
        // Lógica para criar um novo disco
        res.send(`Disco criado: ${JSON.stringify(novoDisco)}`);
    }

    static atualizarDisco(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        // Lógica para atualizar um disco existente
        res.send(`Disco com ID ${id} atualizado com: ${JSON.stringify(dadosAtualizados)}`);
    }

    static deletarDisco(req, res) {
        const { id } = req.params;
        // Lógica para deletar um disco
        res.send(`Disco com ID ${id} deletado`);
    }
}

module.exports = DiscoController;
