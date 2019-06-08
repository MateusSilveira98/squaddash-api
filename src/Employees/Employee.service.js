const EmployeeRepository = require('./Employee.repository');
const Tools = require('../_Helpers/Tools');

module.exports = {
  async create(param) {
    const employee = await EmployeeRepository.getByName(param.name);
    if (employee) throw 'esta pessoa já está criada! :(';
    return await EmployeeRepository.create(param);
  },
  async edit(param) {
    param.updated_at = Tools.formatDate(Date.now());
    const employee = await EmployeeRepository.getById(param.id);
    if (!employee) throw 'pessoa não encontrada! :(';
    Object.assign(employee, param);
    return await EmployeeRepository.edit(employee);
  },
  async getAll() {
    return await EmployeeRepository.getAll();
  },
  async getById(id) {
    const employee = await EmployeeRepository.getById(id);
    if (!employee) throw 'pessoa não encontrada! :(';
    return employee
  }
}