const bcrypt = require('bcryptjs');
exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { name: 'admin', email: 'admin@admin.com', password: bcrypt.hashSync('admin', 10) }
      ]);
    });
};
