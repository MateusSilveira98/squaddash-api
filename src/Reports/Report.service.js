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

const squadsMoreExpensive = (squads) => _.orderBy(squads, ['cost'], ['desc']);
const squadsMoreCheap = (squads) => _.orderBy(squads, ['cost'], ['asc']);
const clientsCreatedRecently = (clients) => _.orderBy(clients, ['created_at'], ['desc']);
const projectsHigherBalance = (projects) => _.orderBy(projects, ['balance'], ['desc']);
const projectsLowerBalance = (projects) => _.orderBy(projects, ['balance'], ['asc']);
const employeesOnline = (employees) => employees.filter(employee => employee.status);
const employeesOffline = (employees) => employees.filter(employee => !employee.status);
const getGainsPerProject = (projects) => 0;
const getCostPerProject = (projects) => 0;
const getBalance = (gains, costs) => 0;
// const getGainsPerProject = (projects) => projects.map(project => +project.gains).reduce((acumulator, current) => acumulator + current);
// const getCostPerProject = (projects) => projects.map(project => +project.cost).reduce((acumulator, current) => acumulator + current);
// const getBalance = (gains, costs) => gains - costs;
module.exports = {
  async getAll() {
    try {
      let squads = await getSquads();
      let employees = await getEmployees();
      let clients = await getClients();
      let projects = await getProjects();
      ReportModel.clients.createdRecently = clientsCreatedRecently(clients).slice(0, 5);
      ReportModel.employees.online = employeesOnline(employees).slice(0, 5);
      ReportModel.employees.offline = employeesOffline(employees).slice(0, 5);
      ReportModel.projects.higherBalance = [];
      // ReportModel.projects.higherBalance = projectsHigherBalance(projects).slice(0, 5);
      // ReportModel.projects.lowerBalance = projectsLowerBalance(projects).slice(0, 5);
      ReportModel.projects.lowerBalance = [];
      ReportModel.squads.moreCheap = [];
      ReportModel.squads.moreExpensive = [];
      // ReportModel.squads.moreCheap = squadsMoreCheap(squads).slice(0, 5);
      // ReportModel.squads.moreExpensive = squadsMoreExpensive(squads).slice(0, 5);
      ReportModel.currency.gains = getGainsPerProject(projects);
      ReportModel.currency.costs = getCostPerProject(projects);
      ReportModel.currency.balance = getBalance(ReportModel.currency.gains, ReportModel.currency.costs);
      // console.log(ReportModel)
      return ReportModel
    } catch (error) {
      console.log(error)
      return Callbacks.callbackHandler('error', error || 'falha ao buscar os relatórios! :(');      
    }
  }
}