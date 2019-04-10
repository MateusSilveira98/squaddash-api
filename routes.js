const express = require('express');
const routes = express.Router();

// Clients
const ClientController = require('./src/Client/Client.controller');
routes.get('/clients', ClientController.getAllClients);
routes.get('/client/:id', ClientController.getClientById);
routes.post('/client/create', ClientController.createClient);
routes.put('/client/edit', ClientController.editClient);

// Projects
// const ProjectController = require('./Project.controller');
// routes.get('/projects', ProjectController.getAllProjects);
// routes.get('/project/:id', ProjectController.getProjectById);
// routes.post('/project/create', ProjectController.createProject);
// routes.put('/project/edit', ProjectController.editProject);

// Squads
// const SquadController = require('./Squad.controller');
// routes.get('/squads', SquadController.getAllSquads);
// routes.get('/squad/:id', SquadController.getSquadById);
// routes.post('/squad/create', SquadController.createSquad);
// routes.put('/squad/edit', SquadController.editSquad);

// Employees
const EmployeeController = require('./src/Employee/Employee.controller');
routes.get('/employees', EmployeeController.getAllEmployees);
routes.get('/employee/:id', EmployeeController.getEmployeeById);
routes.post('/employee/create', EmployeeController.createEmployee);
routes.put('/employee/edit', EmployeeController.editEmployee);

// Users
// const UserController = require('./User.controller');
// routes.get('/users', UserController.getAllUsers);
// routes.get('/user/:id', UserController.getUserById);
// routes.post('/user/create', UserController.createUser);
// routes.put('/user/edit', UserController.editUser);

module.exports = routes