exports.up = (knex, Promise) => {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('profile_photo').nullable();
        table.text('password');
        table.integer('roleId').nullable();
        table.foreign('roleId').references('id').inTable('roles');
        table.boolean('status').defaultTo(true);
        table.boolean('deleted').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }
  });
};
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
