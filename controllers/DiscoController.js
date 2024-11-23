const { Disco, Artista, Genero, Faixa } = require('../models');
const upload = require('../middlewares/upload');  // Certifique-se de que o caminho esteja correto

class DiscoController {
    static async listarDiscos(req, res) {
        try {
            const discos = await Disco.findAll({
                include: [
                    { model: Artista, as: 'artista' },
                    { model: Genero, as: 'generos' },
                    { model: Faixa, as: 'faixas' },
                ],
            });

            // Buscar todos os artistas para preencher o formulário
            const artistas = await Artista.findAll();

            // Verificar se a query string contém parâmetros de sucesso ou erro
            const successMessage = req.query.success ? 'Disco adicionado com sucesso!' : null;
            const errorMessage = req.query.error ? 'Ocorreu um erro ao adicionar o disco.' : null;

            // Renderizar a página 'catalogo' com discos, artistas e as mensagens de sucesso ou erro
            res.render('catalogo', { discos, artistas, successMessage, errorMessage });
        } catch (error) {
            // Em caso de erro, redirecionar com uma mensagem de erro
            res.redirect('/discos?error=true');
        }
    }
    

    static async obterDisco(req, res) {
        try {
            const { id } = req.params;
            const disco = await Disco.findByPk(id, {
                include: [
                    { model: Artista, as: 'artista' },
                    { model: Genero, as: 'generos' },
                    { model: Faixa, as: 'faixas' },
                ],
            });
            if (!disco) {
                return res.status(404).json({ error: 'Disco não encontrado' });
            }
            res.status(200).json(disco);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter disco', details: error.message });
        }
    }

    static criarDisco = [upload.single('capa'), async (req, res) => {
        try {
            const { titulo, ano_lancamento, ArtistaId, novoArtista } = req.body;
    
            let artistaId;
    
            // Verifica se um novo artista foi inserido
            if (novoArtista) {
                // Cria o novo artista
                const novoArtistaCriado = await Artista.create({ nome: novoArtista });
                artistaId = novoArtistaCriado.id;
            } else {
                artistaId = ArtistaId;
            }
    
            // Cria o disco associado ao artista
            const novoDisco = await Disco.create({
                titulo,
                ano_lancamento,
                capa: req.file ? `/uploads/${req.file.filename}` : null,  // Verifica se o arquivo foi enviado
                ArtistaId: artistaId, // Associa o artista ao disco
            });
    
            // Redireciona para a página de catálogo com uma mensagem de sucesso
            res.redirect('/discos?success=true');
        } catch (error) {
            // Redireciona para a página de catálogo com uma mensagem de erro
            res.redirect('/discos?error=true');
        }
    }];




    static async atualizarDisco(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Disco.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ error: 'Disco não encontrado' });
            }
            res.status(200).json({ message: 'Disco atualizado com sucesso' });
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar disco', details: error.message });
        }
    }

    static async deletarDisco(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Disco.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ error: 'Disco não encontrado' });
            }
            res.status(200).json({ message: 'Disco deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar disco', details: error.message });
        }
    }
}

module.exports = DiscoController;
