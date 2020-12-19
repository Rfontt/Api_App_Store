exports.up = function(knex) {
  return knex.schema.createTable('Purchases', table => {
    table.increments('id').primary();
    table.string('purchase').notNullable();
    table.double('pricePurchase').notNullable();
    table.integer('pieceQuantity').notNullable();
    table.double('payment').notNullable();
    table.integer('installment').notNullable();
    table.double('valueToSell').notNullable();
    table.double('profit').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Purchases');
};
