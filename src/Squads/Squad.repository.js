const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(squad) {
    try {
      return await knex('squads').returning('id').insert(squad);
    } catch (error) {
      return await { error };
    }
  },
  async edit(squad) {
    try {
      return await knex('squads').returning('id').where('id', squad.id).update(squad);
    } catch (error) {
      return await { error };
    }
  },
  async getAll() {
    try {
      return await knex('squads')
        .where('deleted', false)
        .orderBy('name')
    } catch (error) {
      return await { error };
    }
  },
  async getEmployeesFromSquads() {
    try {
      return await knex('employees')
        .where('deleted', false)
        .orderBy('name')
    } catch (error) {
      return await { error }
    }
  },
  async getById(id) {
    try {
      return await knex('squads')
        .where('squads.id', id)
        .andWhere('squads.deleted', false)
        .orderBy('squads.name')
    } catch (error) {
      return await { error };
    }
  }
}