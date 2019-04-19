const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(client) {
    try {
      return await knex('clients').returning('id').insert(client);
    } catch(error) {
      return await error;
    }
  },
  async edit(client) {
    try {
      return await knex('clients').returning('id').where('id', client.id).update(client);
    } catch(error) {
      return await error;
    }
  },
  async getAll() {
    try {
      return await knex('clients').where('deleted', false).orderBy('name');
    } catch (error) {
      return await error;
    }
  },
  async getById(id) {
    try {
      return await knex('clients').where('id', id).andWhere('deleted', false);
    } catch (error) {
      return await error;
    }
  }
}