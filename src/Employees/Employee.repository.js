const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(employee) {
    try {
      return await knex('employees').returning('id').insert(employee);
    } catch (error) {
      return await {error};
    }
  },
  async edit(employee) {
    try {
      return await knex('employees').returning('id').where('id', employee.id).update(employee);
    } catch (error) {
      return await {error};
    }
  },
  async getAll() {
    try {
      return await knex('employees').where('employees.deleted', false).orderBy('name');
    } catch (error) {
      return await {error};
    }
  },
  async getById(id) {
    try {
      return await knex('employees').where('id', id).andWhere('deleted', false);
    } catch (error) {
      return await {error};
    }
  }
}