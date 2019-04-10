const knex = require('knex');
module.exports = {
  async getAllClients() {
    try {
      return await knex.select('*').from('clients').timeout(1000)
    } catch(err) {
      return await {error: err}
    }
  },
  async getClientById(id) {
    try {
      return await knex('clients').where('id', id);
    } catch(err) {
      return await {error: err};
    }
  },
  async createClient(client) {
    try {
      return await knex('clients').insert(client);
    } catch(err) {
      return await {error: err};
    }
  },
  async editClient(client) {
    try {
      return await knex('clients').where('id',client.id).update(client);
    } catch(err) {
      return await {error: err};
    }
  }
}