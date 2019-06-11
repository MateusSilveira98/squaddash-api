const EmployeeService = require('../Employees/Employee.service');
const MonthlySquadService = require('../MonthlySquads/MonthlySquad.service');
const _ = require('lodash');

const ReportModel = {
  employees: {
    online: [],
    offline: []
  }
}

const getEmployees = async () => await EmployeeService.getAllEmployeesInSquads();
const getMonthlySquads = async () => await MonthlySquadService.getAll();

const employeesOnline = (employees) => employees.filter(employee => employee.status);
const employeesOffline = (employees) => employees.filter(employee => !employee.status);
const filterMonthlySquads = (monthlySquads, year) => monthlySquads.filter(item => item.year == year)
const getMonthlyCosts = (monthlySquads) => monthlySquads.map(item => parseFloat(item.cost)).reduce((acumulator, current) => acumulator + current);

module.exports = {
  async getAll() {
    let employees = await getEmployees();
    ReportModel.employees.online = employeesOnline(employees);
    ReportModel.employees.offline = employeesOffline(employees);
    return ReportModel
  },
  async getCostByYear(year) {
    let monthlySquads = await getMonthlySquads();
    monthlySquads = filterMonthlySquads(monthlySquads, year);
    let costs = monthlySquads.length > 0 ? getMonthlyCosts(monthlySquads) : 0;
    return costs
  }
}