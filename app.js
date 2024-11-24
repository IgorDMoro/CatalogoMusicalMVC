const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuração do EJS como motor de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para interpretar requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const methodOverride = require('method-override');

// Configurar method-override para processar `_method` na query ou body
app.use(methodOverride('_method'));

// Importar rotas
const artistaRoutes = require('./routes/artistaRoutes');
const discoRoutes = require('./routes/discoRoutes');
const faixaRoutes = require('./routes/faixaRoutes');
const generoRoutes = require('./routes/generoRoutes');

// Página inicial
app.get('/', (req, res) => {
    res.render('home'); // Renderiza a view 'home.ejs'
});

// Rotas principais
app.use('/artistas', artistaRoutes);
app.use('/discos', discoRoutes);
app.use('/faixas', faixaRoutes);
app.use('/generos', generoRoutes);

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
