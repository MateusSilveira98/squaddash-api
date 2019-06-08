const SquadService = require('./Squad.service');
const Callbacks = require('../_Helpers/Callbacks');
const Tools = require('../_Helpers/Tools');

const requiredFieldsToCreate = [
  {
    name: 'name',
    label: 'nome'
  },
  {
    name: 'employees',
    label: 'pessoas'
  }
];
const notRequiredFieldsToCreate = [
  'status',
  'created_at',
  'updated_at',
  'id',
  'deleted'
];
const requiredFieldsToEdit = [
  {
    name: 'name',
    label: 'nome'
  },
  {
    name: 'employees',
    label: 'pessoas'
  },
  {
    name: 'id',
    label: 'id'
  }
];
const notRequiredFieldsToEdit = [
  'status',
  'created_at',
  'updated_at',
  'deleted'
];
module.exports = {
  async create(req, res) {
    try {
      let fields = Tools.validateFields(req.body, requiredFieldsToCreate, notRequiredFieldsToCreate);
      if (fields.length == 0) {
        const created = await SquadService.create(req.body)
        if (created.length > 0) return res.json(Callbacks.callbackHandler('success', 'squad criado com sucesso! :)'));
        else throw 'falha ao criar o squad! :(';
      } else throw fields.length > 1 ? `Campos: ${fields.map(field => field).join('; ')} são obrigatórios` : `campo: ${fields[0]} é obrigatório`
    } catch (error) {
      console.log(error)
      return res.json(Callbacks.callbackHandler('error', error));
    }
  },
  async edit(req, res) {
    try {
      let fields = Tools.validateFields(req.body, requiredFieldsToEdit, notRequiredFieldsToEdit);
      if (fields.length == 0) {
        const updated = await SquadService.edit(req.body)
        if (updated.length > 0) return res.json(Callbacks.callbackHandler('success', 'squad alterado com sucesso! :)'));
        else throw 'falha ao alterar o squad! :(';
      } else throw fields.length > 1 ? `Campos: ${fields.map(field => field).join('; ')} são obrigatórios` : `campo: ${fields[0]} é obrigatório`
    } catch (error) {
      console.log(error)
      return Callbacks.callbackHandler('error', error)
    }
  },
  async getAll(req, res) {
    try {
      const squads = await SquadService.getAll();
      return res.json(squads);
    } catch (error) {
      console.log(error)
      return Callbacks.callbackHandler('error', error || 'falha ao buscar os squads! :(')
    }
  },
  async getById(req, res) {
    try {
      const squad = await SquadService.getById(req.params.id);
      return res.json(squad);
    } catch (error) {
      console.log(error)
      return Callbacks.callbackHandler('error', error || 'falha ao buscar o squad! :(')
    }
  }
};