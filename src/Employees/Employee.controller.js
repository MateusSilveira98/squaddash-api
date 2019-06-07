const EmployeeService = require('./Employee.service');
const Callbacks = require('../_Helpers/Callbacks');

const requiredFields = [
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
let fields = [];
const validateFields = (body) => {
  Object.keys(body).forEach(prop => {
    let field = requiredFields.find(field => field.name == prop);
    if(!field)
      fields.push(field.label);
  });
}
module.exports = {
  async create(req, res) {
    try {
      validateFields(req.body);
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
    const updated = await EmployeeService.edit(req.body)
    return res.json(updated);
  },
  async getAll(req, res) {
    const employees = await EmployeeService.getAll();
    return res.json(employees);
  },
  async getById(req, res) {
    const employee = await EmployeeService.getById(req.params.id);
    return res.json(employee);
  }
};