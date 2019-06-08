const EmployeeService = require('./Employee.service');
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
  },
  {
    name: 'modality_of_contracting',
    label: 'regime de contratação'
  },
  {
    name: 'skills',
    label: 'habilidades'
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
    name: 'modality_of_contracting',
    label: 'regime de contratação'
  },
  {
    name: 'skills',
    label: 'habilidades'
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
        const created = await EmployeeService.create(req.body)
        if (created.length > 0) return res.json(Callbacks.callbackHandler('success', 'pessoa criada com sucesso! :)'));
        else throw 'falha ao criar uma pessoa! :(';
      } else throw fields.length > 1 ? `Campos: ${fields.map(field => field).join('; ')} são obrigatórios` : `campo: ${fields[0]} é obrigatório`
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error));
    }
  },
  async edit(req, res) {
    try {
      let fields = Tools.validateFields(req.body, requiredFieldsToEdit, notRequiredFieldsToEdit);
      if(fields.length == 0) {
        const updated = await EmployeeService.edit(req.body)
        if (updated.length > 0)
          return res.json(Callbacks.callbackHandler('success', 'pessoa alterada com sucesso! :)'))
        else throw 'falha ao editar uma pessoa!'
      } else throw fields.length > 1 ? `Campos: ${fields.map(field => field).join('; ')} são obrigatórios` : `campo: ${fields[0]} é obrigatório`
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error || 'falha ao alterar a pessoa! :('))
    }
  },
  async getAll(req, res) {
    try {
      const employees = await EmployeeService.getAll();
      return res.json(employees);
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error || 'falha ao buscar as pessoas! :('))
    }
  },
  async getById(req, res) {
    try {
      const employee = await EmployeeService.getById(req.params.id);
      return res.json(employee);
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error || 'falha ao buscar a pessoa'))
    }
  }
};