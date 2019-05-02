const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(user) {
    const result = await knex('users').returning(['id']).insert(user);
    return result[0];
  },
  async edit(user) {
    const result = await knex('users').returning(['id']).where('id', user.id).update(user);
    return result[0];
  },
  async getAll(id) {
    return await knex.columns(['users.*', 'roles.type']).from('users')
      .innerJoin('roles', 'users.role_id', 'roles.id')
      .where('users.id', '!=' , id)
      .andWhere('users.deleted', false)
      .orderBy('users.name');
  },
  async getById(id) {
    const result = await knex.columns(['users.*', 'roles.type']).from('users')
      .innerJoin('roles', 'users.role_id', 'roles.id')
      .where('users.id', id)
      .andWhere('users.deleted', false);
    return result[0];
  },
  async getByEmail(email) {
    const result = await knex.columns(['users.*', 'roles.type']).from('users')
      .innerJoin('roles', 'users.role_id', 'roles.id')
      .where('users.email', email)
      .andWhere('users.deleted', false);
    return result[0];
  },
  async getByIdToAuthenticate(id) {
    return await knex.column(['password']).from('users').where('id', id).andWhere('deleted', false);
  }
}