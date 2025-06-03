const veterinarioRepository = require('../repositories/veterinarioRepository');
const veterinarioValidation = require('../validations/veterinarioValidation');
module.exports = {
  // GET /api/veterinarios - Retorna todos os veterinários
  async getAll(req, res, next) {
    try {
      const veterinarios = await veterinarioRepository.getAllVeterinarios();
      return res.status(200).json(veterinarios);
    } catch (error) {
      next(error);
    }
  },
  // GET /api/veterinarios/:id - Retorna um veterinário por ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const veterinario = await veterinarioRepository.getVeterinarioById(id);
      if (!veterinario) {
        return res.status(404).json({ message: 'Veterinário não encontrado.' });
      }
      return res.status(200).json(veterinario);
    } catch (error) {
      next(error);
    }
  },
  // POST /api/veterinarios - Cria um novo veterinário
  async create(req, res, next) {
    try {
      // Validação dos dados utilizando Joi
      const validatedData = await veterinarioValidation.validateAsync(req.body);
      const novoVeterinario = await veterinarioRepository.createVeterinario(validatedData);
      return res.status(201).json(novoVeterinario);
    } catch (error) {
      // Caso o erro seja de validação (Joi)
      if (error.isJoi) {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  },
  // PUT /api/veterinarios/:id - Atualiza os dados de um veterinário
  async update(req, res, next) {
    try {
      const { id } = req.params;
      // Validação dos dados atualizados
      const validatedData = await veterinarioValidation.validateAsync(req.body);
      const veterinarioAtualizado = await veterinarioRepository.updateVeterinario(id, validatedData);
      if (!veterinarioAtualizado) {
        return res.status(404).json({ message: 'Veterinário não encontrado.' });
      }
      return res.status(200).json(veterinarioAtualizado);
    } catch (error) {
      if (error.isJoi) {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  },
  // DELETE /api/veterinarios/:id - Remove um veterinário
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const result = await veterinarioRepository.deleteVeterinario(id);
      if (result === 0) {
        return res.status(404).json({ message: 'Veterinário não encontrado.' });
      }
      return res.status(200).json({ message: 'Veterinário removido com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
};