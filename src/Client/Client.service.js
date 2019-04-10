const ClientRepository = require('./Client.repository');
module.exports = {
  async getAllClients() {
    const clients = await ClientRepository.getAllClients();
    console.log('=================================================');
    console.log('getAllClients()', clients);
    console.log('=================================================');
    return await clients;
  },
  async getClientById(id) {
    console.log('=================================================');
    console.log('getClientById', ClientRepository.getClientById(id));
    console.log('=================================================');
    return await ClientRepository.getClientById(id);
  },
  async createClient(client) {
    const response = await ClientRepository.createClient(client);    
    console.log('===========================================================');
    console.log('createClient(client)', response);
    console.log('===========================================================');
    return await response;
  },
  async editClient(client) {
    console.log('=======================================================');
    console.log('editClient(client)', ClientRepository.editClient(client))
    console.log('=======================================================');
    return await ClientRepository.editClient(client);
  }
}