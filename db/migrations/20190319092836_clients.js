exports.up = (knex, Promise) => {
  return knex.schema.hasTable('clients').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('clients', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('logo');
        table.string('cnpj');
        table.boolean('status').defaultTo(true);
        table.boolean('deleted').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }
  });
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('clients');
};
