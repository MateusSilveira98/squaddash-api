const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async getAll() {
    const result = await knex('skills').orderBy('name');
    return result
  }
}