const express = require('express');
const routes = express.Router();

const ReportController = require('./Report.controller');
routes.get('/reports', ReportController.getAll);

module.exports = routes;