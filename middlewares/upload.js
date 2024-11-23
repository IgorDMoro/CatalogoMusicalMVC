const multer = require('multer');
const path = require('path');

// Definir onde os arquivos serão armazenados e o nome do arquivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define o diretório onde os arquivos serão armazenados
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        // Gera um nome único para cada arquivo (evita duplicação)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Verificar se o arquivo é uma imagem
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);  // Se o arquivo for uma imagem permitida
    } else {
        cb(new Error('Arquivo não permitido. Apenas imagens são permitidas.'), false);
    }
};

// Configurar o Multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }  // Limitar o tamanho do arquivo a 10MB
});

module.exports = upload;
