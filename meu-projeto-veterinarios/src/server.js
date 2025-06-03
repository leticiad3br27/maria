// src/server.js
const app = require('./app'); // Importa a instância do Express definida no app.js
// Define a porta a partir das variáveis de ambiente (ou 3000, se não estiver definida)
const PORT = process.env.PORT || 3000;
// Inicia o servidor e imprime uma mensagem no console
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});