const knex = require('knex');
module.exports = {
  async getAllEmployees() {
    try {
      return await knex.select('*').from('employees');
    } catch(err) {
      return await {error: 'Algo de errado não está certo'}
    }
  },
  async getEmployeeById(id) {
    try {
      return await knex('employees').where('id', id);
    } catch(err) {
      return await {error: 'Algo de errado não está certo'};
    }
  },
  async createEmployee(employee) {
    try {
      return await knex('employees').insert(employee);
    } catch(err) {
      return await {error: 'Algo de errado não está certo'};
    }
  },
  async editEmployee(employee) {
    try {
      return await knex('employees').where('id', employee.id).update(employee);
    } catch(err) {
      return await {error: 'Algo de errado não está certo'};
    }
  }
}