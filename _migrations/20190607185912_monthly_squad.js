
exports.up = function (knex, Promise) {
  return knex.schema.createTable('monthly_squads', (table) => {
    table.increments('id').primary();
    table.integer('month');
    table.integer('year');
    table.decimal('cost', 10, 2);
    table.integer('squad_id');
    table.foreign('squad_id').references().inTable('squads');
    table.boolean('status').defaultTo(true);
    table.boolean('deleted').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('monthly_squads');
};
