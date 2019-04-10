const ClientService = require('./Client.service');
module.exports = {
  async getAllClients(req, res) {
    const clients = await ClientService.getAllClients();
    return res.json(clients);
  },
  async getClientById(req, res) {
    const client = await ClientService.getClientsById(req.body.id);
    return res.json(client);
  },
  async createClient(req, res) {
    const client = await ClientService.createClient(req.body);
    return res.json(client);
  },
  async editClient(req, res) {
    const client = await ClientService.editClient(req.body);
    return res.json(client);
  }
};