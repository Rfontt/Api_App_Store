
exports.up = function(knex) {
  return knex.schema.createTable('Password', table => {
    table.increments('id_token').primary();
    table.string('token').notNullable();
    table.integer('used');
    table.integer('id_user')
    .unsigned()
    .references('id')
    .inTable('Users')
    .notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('Password');
};
