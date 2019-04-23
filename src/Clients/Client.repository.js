const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(client) {
    try {
      let result = await knex('clients').returning('id').insert(client);
      return result;
    } catch(error) {
      return await {error};
    }
  },
  async edit(client) {
    try {
      let result = await knex('clients').returning('id').where('id', client.id).update(client);
      return result;
    } catch(error) {
      return await {error};
    }
  },
  async getAll() {
    try {
      return await knex('clients').where('deleted', false).orderBy('name');
    } catch (error) {
      return await {error};
    }
  },
  async getById(id) {
    try {
      return await knex('clients').where('id', id).andWhere('deleted', false);
    } catch (error) {
      return await {error};
    }
  }
}