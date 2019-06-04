const SquadRepository = require('./Squad.repository');
const Callbacks = require('../_Helpers/Callbacks');
const Dates = require('../_Helpers/FormatDate');
const mountSquadCost = (squad) => {
  squad.cost = squad.employees.length > 1 ?
    squad.employees.map(item => Number(item.salary)).reduce((acumulator, current) => acumulator + current) :
    Number(squad.employees[0].salary)
  return squad
}
module.exports = {
  async create(param) {
    try {
      const squad = await SquadRepository.getByName(param.name);
      if (squad) throw 'este squad já está criado! :(';
      if (!param.employees || param.employees.length <= 0) throw '1 squad tem que haver 1 funcionário no mínimo! :(';
      await SquadRepository.create(param);
      return Callbacks.callbackHandler('success', 'squad criado com sucesso! :)')
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao criar o squad! :(')
    }
  },
  async edit(param) {
    try {
      param.updated_at = Dates.formatDate(Date.now());
      const squad = await SquadRepository.getById(param.id);
      if (!squad) throw 'squad não encontrado! :(';
      Object.assign(squad, param);
      await SquadRepository.edit(squad);
      return Callbacks.callbackHandler('success', 'squad alterado com sucesso! :)')
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao alterar o squad! :(')
    }
  },
  async getAll() {
    try {
      let squads = await SquadRepository.getAll();
      return squads.length > 0 ? squads.map(squad => {
        return squad.employees.length > 0 ? mountSquadCost(squad) : squad;
      }) : [];
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao buscar os squads')
    }
  },
  async getById(id) {
    try {
      let squad = await SquadRepository.getById(id);
      if (!squad) throw 'Nenhum squad encontrado! :(';
      return squad.employees.length > 0 ? mountSquadCost(squad) : squad;
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao buscar o squad')
    }
  }
}