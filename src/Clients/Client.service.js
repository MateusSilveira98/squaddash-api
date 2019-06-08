const ClientRepository = require('./Client.repository');
const Tools = require('../_Helpers/Tools');
module.exports = {
  async create(param) {
    const client = await ClientRepository.getByName(param.name);
    if (client) throw 'este client já está criado! :(';
    return await ClientRepository.create(param);
  },
  async edit(param) {
    param.updated_at = Tools.formatDate(Date.now());
    const client = await ClientRepository.getById(param.id);
    if (!client) throw 'cliente não encontrado! :(';
    Object.assign(client, param);
    return await ClientRepository.edit(client);
  },
  async getAll() {
    return await ClientRepository.getAll();
  },
  async getById(id) {
    const client = await ClientRepository.getById(id);
    if (!client) throw 'cliente não encontrado! :(';
    return client
  }
}