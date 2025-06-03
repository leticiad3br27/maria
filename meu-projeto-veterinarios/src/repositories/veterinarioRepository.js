const pool = require('../config/database');
const Veterinario = require('../models/Veterinario');

async function getAllVeterinarios() {
  const [rows] = await pool.query('SELECT * FROM veterinarios');
  return rows.map(row => new Veterinario(row));
}

async function getVeterinarioById(id) {
  const [rows] = await pool.query('SELECT * FROM veterinarios WHERE id = ?', [id]);
  if(rows.length === 0) {
    return null;
  }
  return new Veterinario(rows[0]);
}

async function createVeterinario(data) {
  const { nome, crmv, telefone, email, usuario_id } = data;
  const [result] = await pool.query(
    'INSERT INTO veterinarios (nome, crmv, telefone, email, usuario_id) VALUES (?, ?, ?, ?, ?)',
    [nome, crmv, telefone, email, usuario_id]
  );
  return getVeterinarioById(result.insertId);
}

async function updateVeterinario(id, data) {
  const { nome, crmv, telefone, email, usuario_id } = data;
  await pool.query(
    'UPDATE veterinarios SET nome = ?, crmv = ?, telefone = ?, email = ?, usuario_id = ? WHERE id = ?',
    [nome, crmv, telefone, email, usuario_id, id]
  );
  return getVeterinarioById(id);
}

async function deleteVeterinario(id) {
  const [result] = await pool.query('DELETE FROM veterinarios WHERE id = ?', [id]);
  return result.affectedRows;
}

async function getVeterinarioByUsuarioId(usuario_id) {
  const [rows] = await pool.query('SELECT * FROM veterinarios WHERE usuario_id = ?', [usuario_id]);
  if (rows.length === 0) {
    return null;
  }
  return new Veterinario(rows[0]);
}

module.exports = {
  getAllVeterinarios,
  getVeterinarioById,
  createVeterinario,
  updateVeterinario,
  deleteVeterinario,
  getVeterinarioByUsuarioId
};