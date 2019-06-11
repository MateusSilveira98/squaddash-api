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