const bcrypt = require('bcryptjs');
exports.seed = function (knex, Promise) {
  return knex('users').where('name', 'admin').then(result => {
    if (result[0] && result[0].name == 'admin')
      return knex('users').where('name', result[0].name).del().then(() => {
        return knex('users').insert([
          { name: 'admin', email: 'admin@admin.com', role: 'admin', password: bcrypt.hashSync('admin', 10) }
        ]);
      });
    else
      return knex('users').insert([
        { name: 'admin', email: 'admin@admin.com', role: 'admin', password: bcrypt.hashSync('admin', 10) }
      ]);
  })
};
