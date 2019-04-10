exports.up = (knex, Promise) => {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').nullable();
        table.string('email').nullable();
        table.string('profile_photo').nullable();
        table.text('password').nullable();
        table.integer('role_id').nullable();
        table.foreign('role_id').references('id').inTable('roles');
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
