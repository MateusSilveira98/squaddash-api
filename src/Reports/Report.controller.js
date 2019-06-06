const ReportService = require('./Report.service');
module.exports = {
  async getAll(req, res) {
    const reports = await ReportService.getAll();
    return res.json(reports);
  }
};