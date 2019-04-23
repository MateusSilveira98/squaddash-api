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
    const employees = await SquadRepository.getEmployeesFromSquads();
    let squads = await SquadRepository.getAll();
    return squads.map(squad => {
      squad.employees = employees.filter(employee => employee.squad_id == squad.id);
      return squad
    });
  },
  async getById(id) {
    const employees = await SquadRepository.getEmployeesFromSquads();
    let squad = await SquadRepository.getById(id);
    squad = squad[0];
    squad.employees = employees.filter(employee => employee.squad_id == squad.id);
    return squad;
  }
}