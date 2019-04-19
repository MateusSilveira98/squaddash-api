const express = require('express');
const routes = express.Router();

const ClientRoutes = require('./Clients/Client.routes');
const SquadRoutes = require('./Squads/Squad.routes');
const EmployeeRoutes = require('./Employees/Employee.routes');

routes.use(ClientRoutes);
routes.use(SquadRoutes);
routes.use(EmployeeRoutes);

module.exports = routes;