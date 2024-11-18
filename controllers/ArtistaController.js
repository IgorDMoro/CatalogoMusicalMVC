class ArtistaController {
    static listarArtistas(req, res) {
        res.send('Lista de artistas');
    }

    static obterArtista(req, res) {
        const { id } = req.params;
        res.send(`Detalhes do artista com ID: ${id}`);
    }

    static criarArtista(req, res) {
        const novoArtista = req.body;
        res.send(`Artista criado: ${JSON.stringify(novoArtista)}`);
    }

    static atualizarArtista(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        res.send(`Artista com ID ${id} atualizado com: ${JSON.stringify(dadosAtualizados)}`);
    }

    static deletarArtista(req, res) {
        const { id } = req.params;
        res.send(`Artista com ID ${id} deletado`);
    }
}

module.exports = ArtistaController;
