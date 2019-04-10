const EmployeeRepository = require('./Employee.repository');
module.exports = {
  async getAllEmployees() {
    const employees = await EmployeeRepository.getAllEmployees();
    console.log('=================================================');
    console.log('getAllEmployees()', employees);
    console.log('=================================================');
    return await employees;
  },
  async getEmployeeById(id) {
    console.log('=================================================');
    console.log('getEmployeeById', EmployeeRepository.getEmployeeById(id));
    console.log('=================================================');
    return await EmployeeRepository.getEmployeeById(id);
  },
  async createEmployee(employee) {
    const response = await EmployeeRepository.createEmployee(employee);    
    console.log('===========================================================');
    console.log('createEmployee(employee)', response);
    console.log('===========================================================');
    return await response;
  },
  async editEmployee(employee) {
    console.log('=======================================================');
    console.log('editEmployee(employee)', EmployeeRepository.editEmployee(employee))
    console.log('=======================================================');
    return await EmployeeRepository.editEmployee(employee);
  }
}