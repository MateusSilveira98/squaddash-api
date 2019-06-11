const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(monthlysquad) {
    return await knex('monthly_squads').insert(monthlysquad).returning('id');
  },
  async edit(monthlysquad) {
    return await knex('monthly_squads').where('id', monthlysquad.id).update(monthlysquad).returning('id');
  },
  async getAll() {
    let monthlysquads = await knex('monthly_squads')
      .where('deleted', false)
    for (let i = 0; i < monthlysquads.length; i++) {
      let squad = await knex('squads').where('id', monthlysquads[i].squad_id);
      monthlysquads[i].squad = squad[0];
      monthlysquads[i].squad.employees = [];
      let squadsemployees = await knex('squads_employees').where('squad_id',monthlysquads[i].squad.id);
      let employee_ids = squadsemployees.map(item => item.employee_id);
      for (let j = 0; j < employee_ids.length; j++) {
        let employee = await knex('employees')
          .where('id', employee_ids[j])
          .andWhere('deleted', false);
          monthlysquads[i].squad.employees.push(employee[0])
      }
    }
    return monthlysquads
  },
  async getById(id) {
    let monthlysquad = await knex('monthly_squads')
      .where('id', id)
      .andWhere('deleted', false)
    monthlysquad = monthlysquad[0];
    return monthlysquad
  },
  async getBySquadId(param) {
    const result = await knex('monthly_squads')
      .where('squad_id', param.squad_id)
      .andWhere('month', param.month)
      .andWhere('year', param.year)
      .andWhere('deleted', false);
    return result[0]
  }
}