exports.up = (knex, Promise) => {
  return knex.schema.hasTable('roles').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('roles', (table) => {
        table.increments('id').primary();
        table.string('type');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }
  });
};
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('roles');
};