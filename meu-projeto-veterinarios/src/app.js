// src/app.js
const express = require('express');
const dotenv = require('dotenv');
// Carrega as variáveis de ambiente definidas no arquivo .env
dotenv.config();
const app = express();
// Middleware para processar requisições com corpo em JSON
app.use(express.json());
// Importa as rotas do módulo de veterinários
const veterinariosRoutes = require('./routes/veterinariosRoutes');
// Define a rota base para a API de veterinários
app.use('/api/veterinarios', veterinariosRoutes);
// Middleware global para tratamento de erros
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);
module.exports = app;