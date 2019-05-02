const bcrypt = require('bcryptjs');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').where('type', 'admin').then(result => {
        const role = result[0];
        
        return knex('users').insert([
          {name: role.type, email: role.type, password: bcrypt.hashSync(role.type, 10), role_id: role.id}
        ]);
      });
    });
};
