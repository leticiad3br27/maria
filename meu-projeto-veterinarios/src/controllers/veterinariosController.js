const veterinarioRepository = require('../repositories/veterinarioRepository');
const veterinarioValidation = require('../validations/veterinarioValidation');

module.exports = {
  // GET /api/veterinarios - Retorna todos os veterinários
  async getAll(req, res, next) {
    try {
      const veterinarios = await veterinarioRepository.getAllVeterinarios();
      return res.status(200).json(veterinarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar veterinários.', details: error.message });
    }
  },

  // GET /api/veterinarios/:id - Retorna um veterinário por ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'ID inválido.' });
      }
      const veterinario = await veterinarioRepository.getVeterinarioById(id);
      if (!veterinario) {
        return res.status(404).json({ error: 'Veterinário não encontrado.' });
      }
      return res.status(200).json(veterinario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar veterinário.', details: error.message });
    }
  },

  // POST /api/veterinarios - Cria um novo veterinário
  async create(req, res, next) {
    try {
      // Validação dos dados utilizando Joi
      const validatedData = await veterinarioValidation.validateAsync(req.body);

      // Verifica se já existe veterinário com o mesmo usuario_id
      if (validatedData.usuario_id) {
        const existente = await veterinarioRepository.getVeterinarioByUsuarioId(validatedData.usuario_id);
        if (existente) {
          return res.status(409).json({ error: 'Já existe um veterinário cadastrado para este usuário.' });
        }
      }

      const novoVeterinario = await veterinarioRepository.createVeterinario(validatedData);
      return res.status(201).json(novoVeterinario);
    } catch (error) {
      if (error.isJoi) {
        return res.status(400).json({ error: 'Erro de validação.', details: error.message });
      }
      return res.status(500).json({ error: 'Erro ao criar veterinário.', details: error.message });
    }
  },

  // PUT /api/veterinarios/:id - Atualiza os dados de um veterinário
  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'ID inválido.' });
      }
      const validatedData = await veterinarioValidation.validateAsync(req.body);

      // Se for atualizar o usuario_id, verifica se já existe outro veterinário com esse usuario_id
      if (validatedData.usuario_id) {
        const existente = await veterinarioRepository.getVeterinarioByUsuarioId(validatedData.usuario_id);
        if (existente && existente.id != id) {
          return res.status(409).json({ error: 'Já existe um veterinário cadastrado para este usuário.' });
        }
      }

      const veterinarioAtualizado = await veterinarioRepository.updateVeterinario(id, validatedData);
      if (!veterinarioAtualizado) {
        return res.status(404).json({ error: 'Veterinário não encontrado para atualização.' });
      }
      return res.status(200).json(veterinarioAtualizado);
    } catch (error) {
      if (error.isJoi) {
        return res.status(400).json({ error: 'Erro de validação.', details: error.message });
      }
      return res.status(500).json({ error: 'Erro ao atualizar veterinário.', details: error.message });
    }
  },

  // DELETE /api/veterinarios/:id - Remove um veterinário
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'ID inválido.' });
      }
      const result = await veterinarioRepository.deleteVeterinario(id);
      if (result === 0) {
        return res.status(404).json({ error: 'Veterinário não encontrado para remoção.' });
      }
      return res.status(200).json({ message: 'Veterinário removido com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover veterinário.', details: error.message });
    }
  }
};