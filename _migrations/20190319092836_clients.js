exports.up = (knex, Promise) => {
  return knex.schema.hasTable('clients').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('clients', (table) => {
        table.increments('id').primary();
        table.string('name').nullable();
        table.string('email').nullable();
        table.string('logo').nullable();
        table.string('cnpj').nullable();
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
