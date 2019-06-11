const express = require('express');
const routes = express.Router();

const ReportController = require('./Report.controller');
routes.get('/reports', ReportController.getAll);
routes.get('/reports/currency/:year', ReportController.getCostByYear);

module.exports = routes;