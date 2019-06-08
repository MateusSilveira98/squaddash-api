const SquadRepository = require('./Squad.repository');
const Callbacks = require('../_Helpers/Callbacks');
const Tools = require('../_Helpers/Tools');

module.exports = {
  async create(param) {
    const squad = await SquadRepository.getByName(param.name);
    if (squad) throw 'este squad já está criado! :(';
    if (!param.employees || param.employees.length <= 0) throw '1 squad tem que haver 1 pessoa no mínimo! :(';
    return await SquadRepository.create(param);
  },
  async edit(param) {
    param.updated_at = Tools.formatDate(Date.now());
    const squad = await SquadRepository.getById(param.id);
    if (!squad) throw 'squad não encontrado! :(';
    Object.assign(squad, param);
    return await SquadRepository.edit(squad);
  },
  async getAll() {
    return await SquadRepository.getAll();
  },
  async getById(id) {
    let squad = await SquadRepository.getById(id);
    if (!squad) throw 'Nenhum squad encontrado! :(';
    return squad;
  }
}