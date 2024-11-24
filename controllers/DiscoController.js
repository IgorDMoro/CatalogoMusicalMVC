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
            
            // Buscar todos os gêneros para preencher o formulário
            const generos = await Genero.findAll();

            // Verificar se a query string contém parâmetros de sucesso ou erro
            const successMessage = req.query.success ? 'Disco adicionado com sucesso!' : null;
            const errorMessage = req.query.error ? 'Ocorreu um erro ao adicionar o disco.' : null;

            // Renderizar a página 'catalogo' com discos, artistas, gêneros e mensagens de sucesso ou erro
            res.render('catalogo', { discos, artistas, generos, successMessage, errorMessage });
        } catch (error) {
            // Em caso de erro, redirecionar com uma mensagem de erro
            res.redirect('/discos?error=true');
        }
    }

    static async buscarDiscos(req, res) {
        try {
            const { titulo, artista, genero } = req.query;
    
            // Construir a consulta dinâmica
            const where = {};
            if (titulo) where.titulo = { [Op.like]: `%${titulo}%` };
    
            const include = [];
            if (artista) {
                include.push({
                    model: Artista,
                    as: 'artista',
                    where: { nome: { [Op.like]: `%${artista}%` } },
                });
            }
            if (genero) {
                include.push({
                    model: Genero,
                    as: 'generos',
                    where: { nome: { [Op.like]: `%${genero}%` } },
                });
            }
    
            const discos = await Disco.findAll({
                where,
                include,
            });
    
            res.render('catalogo', { discos });
        } catch (error) {
            res.status(500).send('Erro ao buscar discos.');
        }
    }
    
    static async mostrarEdicao(req, res) {
        try {
            const { id } = req.params;
            const disco = await Disco.findByPk(id, {
                include: ['artista', 'generos'],
            });
    
            const artistas = await Artista.findAll();
            const generos = await Genero.findAll();
    
            res.render('editarDisco', { disco, artistas, generos });
        } catch (error) {
            res.status(500).send('Erro ao carregar edição.');
        }
    }
    
    static async editarDisco(req, res) {
        try {
            const { id } = req.params;
            const { titulo, ano_lancamento, ArtistaId, generosSelecionados, faixas } = req.body;
    
            const disco = await Disco.findByPk(id);
    
            if (!disco) return res.status(404).send('Disco não encontrado.');
    
            await disco.update({ titulo, ano_lancamento, ArtistaId });
    
            if (generosSelecionados) {
                const generos = await Genero.findAll({ where: { id: generosSelecionados } });
                await disco.setGeneros(generos);
            }

             // Atualizar as faixas
    if (faixas && faixas.length > 0) {
        const faixasArray = Array.isArray(faixas) ? faixas : [faixas];
  
        // Apagar faixas antigas e criar novas
        await Faixa.destroy({ where: { DiscoId: disco.id } });
        for (const faixaTitulo of faixasArray) {
          await Faixa.create({ titulo: faixaTitulo, DiscoId: disco.id });
        }
      }
    
            res.redirect('/discos');
        } catch (error) {
            res.status(500).send('Erro ao editar disco.');
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
            const { titulo, ano_lancamento, ArtistaId, novoArtista, generosSelecionados, novoGenero } = req.body;

    
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


            if (novoGenero) {
                const novoGeneroCriado = await Genero.create({ nome: novoGenero });
                await novoDisco.addGenero(novoGeneroCriado); // Adiciona o gênero recém-criado ao disco
        }

        // Vincula os gêneros selecionados (se houver) ao disco
        if (generosSelecionados) {
            const generoIds = Array.isArray(generosSelecionados) ? generosSelecionados : [generosSelecionados];
            const generos = await Genero.findAll({ where: { id: generoIds } });
            await novoDisco.addGeneros(generos); // Relaciona os gêneros ao disco
        }
    
         // Adicionar as faixas ao disco
            if (faixas && faixas.length > 0) {
         const faixasArray = Array.isArray(faixas) ? faixas : [faixas];
            for (const faixaTitulo of faixasArray) {
          await Faixa.create({ titulo: faixaTitulo, DiscoId: novoDisco.id });
        }
      }
  
        
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
            console.log('ID recebido para exclusão:', id); // Log do ID recebido
    
            const deleted = await Disco.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ error: 'Disco não encontrado' });
            }
            res.status(200).json({ message: 'Disco deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar disco:', error);
            res.status(500).json({ error: 'Erro ao deletar disco', details: error.message });
        }
    }
    
}

module.exports = DiscoController;
