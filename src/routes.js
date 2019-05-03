const express = require('express');
const routes = express.Router();

const ClientRoutes = require('./Clients/Client.routes');
const SquadRoutes = require('./Squads/Squad.routes');
const EmployeeRoutes = require('./Employees/Employee.routes');
const UserRoutes = require('./Users/User.routes');
const ProjectRoutes = require('./Projects/Project.routes');

routes.use(ClientRoutes);
routes.use(SquadRoutes);
routes.use(EmployeeRoutes);
routes.use(UserRoutes);
routes.use(ProjectRoutes);

module.exports = routes;