const SquadService = require('../Squads/Squad.service');
const EmployeeService = require('../Employees/Employee.service');
const ClientService = require('../Clients/Client.service');
const ProjectService = require('../Projects/Project.service');
const Callbacks = require('../_Helpers/Callbacks');
const _ = require('lodash');

const MonthlyCurrencyModel = {
  value: 0.0,
  date: '',
  projects: ''
}
const ReportModel = {
  squads: {
    moreExpensive: [],
    moreCheap: []
  },
  employees: {
    online: [],
    offline: []
  },
  clients: {
    createdRecently: []
  },
  projects: {
    higherBalance: [],
    lowerBalance: []
  },
  currency: {
    gains: 0,
    balance: 0,
    costs: 0
  }
}

const getSquads = async () => await SquadService.getAll();
const getEmployees = async () => await EmployeeService.getAll();
const getClients = async () => await ClientService.getAll();
const getProjects = async () => await ProjectService.getAll();

const squadsMoreExpensive = (squads) => _.sortBy(squads, 'cost', 'asc');
const squadsMoreCheap = (squads) => _.sortBy(squads, 'cost', 'desc');
const clientsCreatedRecently = (clients) => _.sortBy(clients, 'created_at', 'asc');
const projectsHigherBalance = (projects) => _.sortBy(projects, 'balance', 'asc');
const projectsLowerBalance = (projects) => _.sortBy(projects, 'balance', 'desc');
const employeesOnline = (employees) => employees.filter(employee => employee.status);
const employeesOffline = (employees) => employees.filter(employee => !employee.status);
const getGainsPerProject = (projects) => projects.map(project => +project.gains).reduce((acumulator, current) => acumulator + current);
const getCostPerProject = (projects) => projects.map(project => +project.cost).reduce((acumulator, current) => acumulator + current);
const getBalance = (gains, costs) => gains - costs;
module.exports = {
  async getAll() {
    try {
      let squads = await getSquads();
      let employees = await getEmployees();
      let clients = await getClients();
      let projects = await getProjects();
      ReportModel.clients.createdRecently = clientsCreatedRecently(clients);
      ReportModel.employees.online = employeesOnline(employees);
      ReportModel.employees.offline = employeesOffline(employees);
      ReportModel.projects.higherBalance = projectsHigherBalance(projects);
      ReportModel.projects.lowerBalance = projectsLowerBalance(projects);
      ReportModel.squads.moreCheap = squadsMoreCheap(squads);
      ReportModel.squads.moreExpensive = squadsMoreExpensive(squads);
      ReportModel.currency.gains = getGainsPerProject(projects);
      ReportModel.currency.costs = getCostPerProject(projects);
      ReportModel.currency.balance = getBalance(ReportModel.currency.gains, ReportModel.currency.costs);
      console.log(ReportModel)
      return ReportModel
    } catch (error) {
      console.log(error)
      return Callbacks.callbackHandler('error', error || 'falha ao buscar os relatórios! :(');      
    }
  }
}