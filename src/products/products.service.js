const knex = require('../db/connection');

function read(product_id) {
  return knex('products').select('*').where({ product_id }).first();
}

function list() {
  return knex('products').select('*');
}

module.exports = {
  read,
  list,
};
