

exports.up = (knex, Promise) => {
  return knex.schema.createTable('employees', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('image').defaultTo('https://res.cloudinary.com/mateus-costa/image/upload/v1556203484/wtt/sem-foto.jpg');
    table.string('modality_of_contracting');
    table.boolean('status').defaultTo(true);
    table.boolean('deleted').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('employees');
};
