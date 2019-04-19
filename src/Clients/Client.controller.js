const ClientService = require('./Client.service');
module.exports = {
  async create(req, res) {
    const created = await ClientService.create(req.body)
    return res.json(created);
  },
  async edit(req, res) {
    const updated = await ClientService.edit(req.body)
    return res.json(updated);
  },
  async getAll(req, res) {
    const clients = await ClientService.getAll();
    return res.json(clients);
  },
  async getById(req, res) {
    const client = await ClientService.getById(req.params.id);
    return res.json(client);
  }
};