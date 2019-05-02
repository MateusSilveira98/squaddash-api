
exports.up = function(knex, Promise) {
	return knex.schema.hasTable('employees_squads').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('employees_squads', (table) => {
				table.increments('id').primary();
        table.integer('squad_id');
        table.foreign('squad_id').references().inTable('squads');
        table.integer('employee_id');
        table.foreign('employee_id').references().inTable('employees');
			});
		}
	});
};

exports.down = function(knex, Promise) {
  
};
