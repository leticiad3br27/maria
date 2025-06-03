const Joi = require('joi');
const veterinarioSchema = Joi.object({
  nome: Joi.string().max(100).required().messages({
    'string.base': 'O nome deve ser um texto',
    'string.empty': 'O nome é obrigatório',
    'any.required': 'O nome é obrigatório'
  }),
  crmv: Joi.string().max(20).required().messages({
    'string.base': 'O CRMV deve ser um texto',
    'string.empty': 'O CRMV é obrigatório',
    'any.required': 'O CRMV é obrigatório'
  }),
  telefone: Joi.string().max(20).allow(null, '').messages({
    'string.base': 'O telefone deve ser um texto',
    'string.max': 'O telefone pode ter no máximo 20 caracteres'
  }),
  email: Joi.string().email().max(100).allow(null, '').messages({
    'string.email': 'O email deve ser válido',
    'string.max': 'O email pode ter no máximo 100 caracteres'
  }),
  usuario_id: Joi.number().integer().allow(null).messages({
    'number.base': 'O id do usuário deve ser um número inteiro'
  })
});
module.exports = veterinarioSchema;