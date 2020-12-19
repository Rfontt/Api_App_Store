exports.up = function(knex) {
  return knex.schema.createTable('Customers', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('purchase').notNullable();
    table.double('price').notNullable();
    table.integer('amount').notNullable();
    table.string('date');
    table.double('total').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Customers');
};
