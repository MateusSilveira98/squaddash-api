const express = require('express');
const routes = express.Router();

const ClientRoutes = require('./Clients/Client.routes');
const SquadRoutes = require('./Squads/Squad.routes');
const EmployeeRoutes = require('./Employees/Employee.routes');
const UserRoutes = require('./Users/User.routes');

routes.use(ClientRoutes);
routes.use(SquadRoutes);
routes.use(EmployeeRoutes);
routes.use(UserRoutes);

module.exports = routes;