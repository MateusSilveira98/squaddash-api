const ReportService = require('./Report.service');
const Callbacks = require('../_Helpers/Callbacks');

module.exports = {
  async getAll(req, res) {
    try {
      const reports = await ReportService.getAll();
      return res.json(reports);
    } catch (error) {
      console.log(error)
      return Callbacks.callbackHandler('error', error || 'falha ao buscar os relatórios! :(');
    }
  },
  async getCostByYear(req, res) {
    try {
      const costs = await ReportService.getCostByYear(req.params.year);
      return res.json(costs);
    } catch (error) {
      console.log(error)
      return Callbacks.callbackHandler('error', error || 'falha ao buscar os relatórios! :(');
    }
  }
};