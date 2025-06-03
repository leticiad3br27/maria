function errorHandler(err, req, res, next) {
    // Log do erro no console para facilitar o debug
    console.error(err);
    // Caso o erro possua uma propriedade "status", essa será utilizada
    const statusCode = err.status || 500;
    
    // Se o erro possuir detalhes adicionais, podemos incluí-los na resposta (opcional)
    const response = {
      error: err.message || 'Erro interno do servidor'
    };
    // Retorna a resposta de erro com o status apropriado
    res.status(statusCode).json(response);
  }
  module.exports = errorHandler;