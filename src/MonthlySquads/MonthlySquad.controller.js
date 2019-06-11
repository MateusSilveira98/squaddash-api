const MonthlySquadService = require('./MonthlySquad.service');
const Callbacks = require('../_Helpers/Callbacks');

module.exports = {
  async create(req, res) {
    try {
      const created = await MonthlySquadService.create(req.body)
      if (created.length > 0) return res.json(Callbacks.callbackHandler('success', 'criado com sucesso! :)'))
      else throw 'falha ao criar! :(';
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error))
    }
  },
  async edit(req, res) {
    try {
      const updated = await MonthlySquadService.edit(req.body)
      if (updated.length > 0) return res.json(Callbacks.callbackHandler('success', 'alterado com sucesso! :)'));
      else throw 'falha ao alterar! :(';
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error))
    }
  },
  async getAll(req, res) {
    try {
      const monthlySquads = await MonthlySquadService.getAll();
      return res.json(monthlySquads);
    } catch (error) {
      console.log(error);
      return Callbacks.callbackHandler('error', error || 'falha ao buscar! :(')
    }
  },
  async getById(req, res) {
    try {
      const monthlySquad = await MonthlySquadService.getById(req.params.id);
      return res.json(monthlySquad);
    } catch (error) {
      console.log(error);
      return Callbacks.callbackHandler('error', error || 'falha ao buscar! :(')
    }
  }
};