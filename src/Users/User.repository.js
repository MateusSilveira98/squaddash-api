const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(user) {
    return await knex('users').insert(user);
  },
  async edit(user) {
    return await knex('users').where('id', user.id).update(user);
  },
  async getAll(id) {
    return await knex('users')
      .where('id', '!=', id)
      .andWhere('deleted', false)
      .orderBy('name');
  },
  async getById(id) {
    const result = await knex('users')
      .where('id', id)
      .andWhere('deleted', false);
    return result[0];
  },
  async getByEmail(email) {
    const result = await knex.columns(['user.*', 'roles.type']).from('users')
      .innerJoin('roles', 'role_id', 'roles.id')
      .where('users.email', email)
      .andWhere('users.deleted', false);
    return result[0];
  },
  async getByIdToAuthenticate(id) {
    return await knex.column(['password']).from('users').where('id', id).andWhere('deleted', false);
  }
}