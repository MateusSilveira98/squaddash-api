const ClientRepository = require('./Client.repository');
const Callbacks = require('../_Helpers/Callbacks');
const Dates = require('../_Helpers/FormatDate');
module.exports = {
  async create(param) {
    try {
      const client = await ClientRepository.getByName(param.name);
      if (client) throw 'este client já está criado! :(';
      await ClientRepository.create(param);
      return Callbacks.callbackHandler('success', 'cliente criado com sucesso! :)')
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao criar o cliente! :(')
    }
  },
  async edit(param) {
    try {
      param.updated_at = Dates.formatDate(Date.now());
      const client = await ClientRepository.getById(param.id);
      if (!client) throw 'cliente não encontrado! :(';
      delete client.employees;
      Object.assign(client, param);
      await ClientRepository.edit(client);
      return Callbacks.callbackHandler('success', 'cliente alterado com sucesso! :)')
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao alterar o cliente! :(')
    }
  },
  async getAll() {
    try {
      return await ClientRepository.getAll();
    } catch(error) {
      return Callbacks.callbackHandler('error', error  || 'falha ao buscar os clientes')
    }
  },
  async getById(id) {
    try {
      const client = await ClientRepository.getById(id);
      if(!client) throw 'cliente não encontrado! :(';
      return client
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao buscar o cliente')
    }
  }
}