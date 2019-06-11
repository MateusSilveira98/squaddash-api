const MonthlySquadRepository = require('./MonthlySquad.repository');
const Tools = require('../_Helpers/Tools');
const moment = require('moment');
module.exports = {
  async create(param) {
    param.month = moment(param.date).month();
    param.year = moment(param.date).year();
    const monthlySquad = await MonthlySquadRepository.getBySquadId(param);
    if (monthlySquad) throw 'este squad já está criado nesse mês e ano! :(';
    delete param.date;
    return await MonthlySquadRepository.create(param);
  },
  async edit(param) {
    param.updated_at = Tools.formatDate(Date.now());
    const monthlySquad = await MonthlySquadRepository.getById(param.id);
    if (!monthlySquad) throw 'custo não encontrado! :(';
    Object.assign(monthlySquad, param);
    delete monthlySquad.date;
    delete monthlySquad.squad;
    return await MonthlySquadRepository.edit(monthlySquad);
  },
  async getAll() {
    return await MonthlySquadRepository.getAll();
  },
  async getById(id) {
    let monthlySquad = await MonthlySquadRepository.getById(id);
    if (!monthlySquad) throw 'projeto não encontrado! :(';
    return monthlySquad
  }
}