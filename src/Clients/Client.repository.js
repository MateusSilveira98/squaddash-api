const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(client) {
    return await knex('clients').insert(client);
  },
  async edit(client) {
    return await knex('clients').where('id', client.id).update(client);
  },
  async getAll() {
    const result = await knex('clients').where('deleted', false).orderBy('name');
    return result
  },
  async getById(id) {
    const result = await knex('clients').where('id', id).andWhere('deleted', false);
    return result[0]
  },
  async getByName(name) {
    const result = await knex('clients').where('name', name).andWhere('deleted', false);
    return result[0]
  }
}