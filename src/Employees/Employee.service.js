const EmployeeRepository = require('./Employee.repository');
const Callbacks = require('../_Helpers/Callbacks');
const Dates = require('../_Helpers/FormatDate');

module.exports = {
  async create(param) {
    const employee = await EmployeeRepository.getByName(param.name);
    if (employee) throw 'esta pessoa já está criada! :(';
    return await EmployeeRepository.create(param);
  },
  async edit(param) {
    try {
      param.updated_at = Dates.formatDate(Date.now());
      const employee = await EmployeeRepository.getById(param.id);
      if (!employee) throw 'pessoa não encontrada! :(';
      Object.assign(employee, param);
      await EmployeeRepository.edit(employee);
      return Callbacks.callbackHandler('success', 'pessoa alterada com sucesso! :)')
    } catch (error) {
      console.log(error);
      return Callbacks.callbackHandler('error', error || 'falha ao alterar a pessoa! :(')
    }
  },
  async getAll() {
    try {
      return await EmployeeRepository.getAll();
    } catch (error) {
      console.log(error);
      return Callbacks.callbackHandler('error', error || 'falha ao buscar as pessoas')
    }
  },
  async getById(id) {
    try {
      const employee = await EmployeeRepository.getById(id);
      if (!employee) throw 'pessoa não encontrada! :(';
      return employee
    } catch (error) {
      console.log(error);
      return Callbacks.callbackHandler('error', error || 'falha ao buscar a pessoa')
    }
  }
}