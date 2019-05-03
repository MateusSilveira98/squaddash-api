const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(squad) {
    return await knex('squads').insert(squad);
  },
  async edit(squad) {
    return await knex('squads').where('id', squad.id).update(squad);
  },
  async getAll() {
    let squads = await knex('squads')
      .where('deleted', false)
      .orderBy('name');
    const employees = await knex('employees').where('deleted', false);
    return squads.map(squad => {
      squad.employees = employees.filter(employee => employee.squad_id == squad.id);
      return squad
    });
  },
  async getById(id) {
    let squad = await knex('squads')
      .where('id', id)
      .andWhere('deleted', false)
      .orderBy('name');
    const employees = await knex('employees').where('deleted', false);
    squad = squad[0];
    squad.employees = employees.filter(employee => employee.squad_id == squad.id);
    return squad
  },
  async getByName(name) {
    const result = await knex('squads').where('name', name).andWhere('deleted', false);
    return result[0]
  }
}