const express = require('express');
const routes = express.Router();

const EmployeeController = require('./Employee.controller');
routes.get('/employees', EmployeeController.getAll);
routes.get('/employee/:id', EmployeeController.getById);
routes.post('/employee/create', EmployeeController.create);
routes.put('/employee/edit', EmployeeController.edit);

module.exports = routes;