const EmployeeService = require('./Employee.service');
module.exports = {
  async getAllEmployees(req, res) {
    const employees = await EmployeeService.getAllEmployees();
    return res.json(employees);
  },
  async getEmployeeById(req, res) {
    const employee = await EmployeeService.getEmployeeById(req.body.id);
    return res.json(employee);
  },
  async createEmployee(req, res) {
    const employee = await EmployeeService.createEmployee(req.body);
    return res.json(employee);
  },
  async editEmployee(req, res) {
    const employee = await EmployeeService.editEmployee(req.body);
    return res.json(employee);
  }
};