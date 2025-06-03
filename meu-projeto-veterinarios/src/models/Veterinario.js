class Veterinario {
    constructor({ id, nome, crmv, telefone, email, usuario_id }) {
      this.id = id;
      this.nome = nome;
      this.crmv = crmv;
      this.telefone = telefone;
      this.email = email;
      this.usuario_id = usuario_id;
    }
  }
  module.exports = Veterinario;