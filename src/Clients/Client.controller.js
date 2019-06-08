const ClientService = require('./Client.service');
const Callbacks = require('../_Helpers/Callbacks');
const Tools = require('../_Helpers/Tools');

const requiredFieldsToCreate = [
  {
    name: 'name',
    label: 'nome'
  },
  {
    name: 'email',
    label: 'email'
  }
];
const notRequiredFieldsToCreate = [
  'image',
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
    name: 'email',
    label: 'email'
  },
  {
    name: 'id',
    label: 'id'
  }
];
const notRequiredFieldsToEdit = [
  'image',
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
        const created = await ClientService.create(req.body)
        if (created.length > 0) return res.json(Callbacks.callbackHandler('success', 'cliente criado com sucesso! :)'));
        else throw 'falha ao criar o cliente! :(';
      } else throw fields.length > 1 ? `Campos: ${fields.map(field => field).join('; ')} são obrigatórios` : `campo: ${fields[0]} é obrigatório`
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error))
    }
  },
  async edit(req, res) {
    try {
      let fields = Tools.validateFields(req.body, requiredFieldsToEdit, notRequiredFieldsToEdit);
      if (fields.length == 0) {
        const updated = await ClientService.edit(req.body)
        if (updated.length > 0) return res.json(Callbacks.callbackHandler('success', 'cliente alterado com sucesso! :)'));
        else throw 'falha ao alterar o cliente! :('
      } else throw fields.length > 1 ? `Campos: ${fields.map(field => field).join('; ')} são obrigatórios` : `campo: ${fields[0]} é obrigatório`
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error))
    }
  },
  async getAll(req, res) {
    try {
      const clients = await ClientService.getAll();
      return res.json(clients);
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error || 'falha ao buscar os clientes! :('))
    }
  },
  async getById(req, res) {
    try {
      const client = await ClientService.getById(req.params.id);
      return res.json(client);
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error || 'falha ao buscar o cliente! :('))
    }
  }
};