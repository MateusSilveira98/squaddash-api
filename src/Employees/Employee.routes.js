const express = require('express');
const routes = express.Router();

const EmployeeController = require('./Employee.controller');
routes.get('/employees', EmployeeController.getAll);
routes.get('/employee/:id', EmployeeController.getById);
routes.post('/employee', EmployeeController.create);
routes.put('/employee', EmployeeController.edit);

module.exports = routes;