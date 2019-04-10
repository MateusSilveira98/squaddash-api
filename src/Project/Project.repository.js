const knex = require('knex');
module.exports = {
  async getAllClients() {
    try {
      return await knex.select('*').from('clients');
    } catch(err) {
      return await {error: 'Algo de errado não está certo'}
    }
  },
  async getClientById(id) {
    try {
      return await knex('clients').where('id', id);
    } catch(err) {
      return await {error: 'Algo de errado não está certo'};
    }
  },
  async createClient(client) {
    try {
      return await knex('clients').insert(client);
    } catch(err) {
      return await {error: 'Algo de errado não está certo'};
    }
  },
  async editClient(client) {
    try {
      return await knex('clients').where('id',client.id).update(client);
    } catch(err) {
      return await {error: 'Algo de errado não está certo'};
    }
  }
}