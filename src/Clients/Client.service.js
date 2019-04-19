const ClientRepository = require('./Client.repository');
const moment = require('moment');
module.exports = {
  async create(client) {
    client.status = true;
    client.deleted = false;
    client.created_at = client.updated_at = moment(Date.now()).format('YYYY-MM-DD');
    const result = await ClientRepository.create(client);
    return {id: result[0]}
  },
  async edit(client) {
    client.updated_at = moment(Date.now()).format('YYYY-MM-DD');
    const result = await ClientRepository.edit(client);
    return {id: result[0]}
  },
  async getAll() {
    return await ClientRepository.getAll();
  },
  async getById(id) {
    const client = await ClientRepository.getById(id);
    return client[0];
  }
}