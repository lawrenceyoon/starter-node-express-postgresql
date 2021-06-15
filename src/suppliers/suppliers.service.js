const knex = require('../db/connection');

function create(supplier) {
  return knex('suppliers')
    .insert(supplier)
    .returning('*')
    .then((createdRecords) => createdRecords[0]);
}

function read(supplier_id) {
  return knex('suppliers').select('*').where({ supplier_id }).first();
}

function update(updatedSupplier) {
  return knex('suppliers')
    .where({ supplier_id: updatedSupplier.supplier_id })
    .update(updatedSupplier, '*')
    .then((createdRecord) => createdRecord[0]);
}

function destroy(supplier_id) {
  return knex('suppliers').where({ supplier_id }).del();
}

function list() {
  return knex('suppliers').select('*');
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
  list,
};
