const SquadRepository = require('./Squad.repository');
const moment = require('moment');

module.exports = {
  async create(squad) {
    squad.status = true;
    squad.deleted = false;
    squad.created_at = squad.updated_at = moment(Date.now()).format('YYYY-MM-DD');
    const result = await SquadRepository.create(squad);
    return result
  },
  async edit(squad) {
    squad.updated_at = moment(Date.now()).format('YYYY-MM-DD');
    const result = await SquadRepository.edit(squad);
    return result
  },
  async getAll() {
    const employees = await SquadRepository.getEmployeesFromSquads();
    let squads = await SquadRepository.getAll();
    return squads.length > 0 ? squads.map(squad => {
      squad.employees = employees.filter(employee => employee.squad_id == squad.id);
      squad.cost = squad.employees.reduce((acumulator, current) => Number(acumulator.salary) + Number(current.salary));
      return squad
    }) : [];
  },
  async getById(id) {
    const employees = await SquadRepository.getEmployeesFromSquads();
    let squad = await SquadRepository.getById(id);
    squad = squad[0];
    squad.employees = employees.filter(employee => employee.squad_id == squad.id);
    return squad;
  }
}