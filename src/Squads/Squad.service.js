const SquadRepository = require('./Squad.repository');
const Callbacks = require('../_Helpers/Callbacks');
const Tools = require('../_Helpers/Tools');

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
      param.updated_at = Tools.formatDate(Date.now());
      const squad = await SquadRepository.getById(param.id);
      if (!squad) throw 'squad não encontrado! :(';
      Object.assign(squad, param);
      await SquadRepository.edit(squad);
      return Callbacks.callbackHandler('success', 'squad alterado com sucesso! :)')
    } catch (error) {
      console.log(error)
      return Callbacks.callbackHandler('error', error || 'falha ao alterar o squad! :(')
    }
  },
  async getAll() {
    try {
      return await SquadRepository.getAll();
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