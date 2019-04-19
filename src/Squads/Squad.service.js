const SquadRepository = require('./Squad.repository');
const moment = require('moment');
module.exports = {
  async create(squad) {
    squad.cost = 0.0;
    squad.status = true;
    squad.deleted = false;
    squad.created_at = squad.updated_at = moment(Date.now()).format('YYYY-MM-DD');
    const result = await SquadRepository.create(squad);
    return {id: result[0]}
  },
  async edit(squad) {
    squad.updated_at = moment(Date.now()).format('YYYY-MM-DD');
    const result = await SquadRepository.edit(squad);
    return {id: result[0]}
  },
  async getAll() {
    return await SquadRepository.getAll();
  },
  async getById(id) {
    const squad = await SquadRepository.getById(id);
    return squad[0];
  }
}