const ProjectService = require('./Project.service');
const Callbacks = require('../_Helpers/Callbacks');
const Tools = require('../_Helpers/Tools');

const requiredFieldsToCreate = [
  {
    name: 'name',
    label: 'nome'
  },
  {
    name: 'revenue',
    label: 'receita'
  },
  {
    name: 'begin_date',
    label: 'data início'
  },
  {
    name: 'finish_date',
    label: 'data de término'
  },
  {
    name: 'client_id',
    label: 'cliente'
  },
  {
    name: 'squad_id',
    label: 'squad'
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
    name: 'revenue',
    label: 'receita'
  },
  {
    name: 'begin_date',
    label: 'data início'
  },
  {
    name: 'finish_date',
    label: 'data de término'
  },
  {
    name: 'client_id',
    label: 'cliente'
  },
  {
    name: 'squad_id',
    label: 'squad'
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
  'deleted',
  'squad',
  'client'
];
module.exports = {
  async create(req, res) {
    try {
      let fields = Tools.validateFields(req.body, requiredFieldsToCreate, notRequiredFieldsToCreate);
      if (fields.length == 0) {
        const created = await ProjectService.create(req.body)
        if (created.length > 0) return res.json(Callbacks.callbackHandler('success', 'projeto criado com sucesso! :)'))
        else throw 'falha ao criar projeto! :(';
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
        const updated = await ProjectService.edit(req.body)
        if (updated.length > 0) return res.json(Callbacks.callbackHandler('success', 'project alterado com sucesso! :)'));
        else throw 'falha ao alterar o projeto! :(';
      } else throw fields.length > 1 ? `Campos: ${fields.map(field => field).join('; ')} são obrigatórios` : `campo: ${fields[0]} é obrigatório`
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error))
    }
  },
  async getAll(req, res) {
    try {
      const projects = await ProjectService.getAll();
      return res.json(projects);
    } catch (error) {
      console.log(error);
      return Callbacks.callbackHandler('error', error || 'falha ao buscar os projetos! :(')
    }
  },
  async getById(req, res) {
    try {
      const project = await ProjectService.getById(req.params.id);
      return res.json(project);
    } catch (error) {
      console.log(error);
      return Callbacks.callbackHandler('error', error || 'falha ao buscar o projeto! :(')
    }
  }
};