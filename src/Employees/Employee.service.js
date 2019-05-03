const EmployeeRepository = require('./Employee.repository');
const Callbacks = require('../_Helpers/Callbacks');
module.exports = {
  async create(param) {
    try {
      const employee = await EmployeeRepository.getByName(param.name);
      if (employee) throw 'este funcionário já está criado! :(';
      await EmployeeRepository.create(param);
      return Callbacks.callbackHandler('success', 'funcionário criado com sucesso! :)')
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao criar o funcionário! :(')
    }
  },
  async edit(param) {
    try {
      const employee = await EmployeeRepository.getById(param.id);
      if (!employee) throw 'funcionário não encontrado! :(';
      delete employee.employees;
      Object.assign(employee, param);
      await EmployeeRepository.edit(employee);
      return Callbacks.callbackHandler('success', 'funcionário alterado com sucesso! :)')
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao alterar o funcionário! :(')
    }
  },
  async getAll() {
    try {
      return await EmployeeRepository.getAll();
    } catch(error) {
      return Callbacks.callbackHandler('error', error  || 'falha ao buscar os funcionários')
    }
  },
  async getById(id) {
    try {
      const employee = await EmployeeRepository.getById(id);
      if(!employee) throw 'funcionário não encontrado! :(';
      return employee
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao buscar o funcionário')
    }
  }
}