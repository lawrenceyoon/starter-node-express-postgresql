const knex = require('../db/connection');

function read(product_id) {
  return knex('products').select('*').where({ product_id }).first();
}

function list() {
  return knex('products').select('*');
}

function listOutOfStockCount() {
  return knex('products')
    .select('product_quantity_in_stock as out_of_stock')
    .count('product_id')
    .where({ product_quantity_in_stock: 0 })
    .groupBy('out_of_stock');
}

module.exports = {
  read,
  list,
  listOutOfStockCount,
};
