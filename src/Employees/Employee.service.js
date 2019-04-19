const EmployeeRepository = require('./Employee.repository');
const moment = require('moment');
module.exports = {
  async create(employee) {
    employee.cost = 0.0;
    employee.status = true;
    employee.deleted = false;
    employee.created_at = employee.updated_at = moment(Date.now()).format('YYYY-MM-DD');
    const result = await EmployeeRepository.create(employee);
    return {id: result[0]}
  },
  async edit(employee) {
    employee.updated_at = moment(Date.now()).format('YYYY-MM-DD');
    const result = await EmployeeRepository.edit(employee);
    return {id: result[0]}
  },
  async getAll() {
    return await EmployeeRepository.getAll();
  },
  async getById(id) {
    const employee = await EmployeeRepository.getById(id);
    return employee[0];
  }
}