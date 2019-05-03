const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(employee) {
    return await knex('employees').insert(employee);
  },
  async edit(employee) {
    return await knex('employees').where('id', employee.id).update(employee);
  },
  async getAll() {
    const result = await knex('employees').where('deleted', false).orderBy('name');
    return result[0]
  },
  async getById(id) {
    const result = await knex('employees').where('id', id).andWhere('deleted', false);
    return result[0]
  },
  async getByName(name) {
    const result = await knex('employees').where('name', name).andWhere('deleted', false);
    return result[0]
  }
}