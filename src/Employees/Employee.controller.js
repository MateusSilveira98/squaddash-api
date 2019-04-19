const EmployeeService = require('./Employee.service');
module.exports = {
  async create(req, res) {
    const created = await EmployeeService.create(req.body)
    return res.json(created);
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