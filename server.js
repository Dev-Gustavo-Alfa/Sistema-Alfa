const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const captacaoRoutes = require('./routes/captacao'); // Certifique-se de que o caminho esteja correto

dotenv.config();
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // O frontend está rodando na porta 3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Configurar middleware
app.use(cors());
app.use(express.json());

// Usar as rotas do arquivo captacao.js
app.use('/api/captacao', captacaoRoutes); // Certifique-se de que a rota está configurada corretamente

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
