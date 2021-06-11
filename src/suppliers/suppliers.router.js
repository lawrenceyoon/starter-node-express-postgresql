const router = require('express').Router({ mergeParams: true });
const controller = require('./suppliers.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/')
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

router.route('/:supplierId').put(controller.update).all(methodNotAllowed);

module.exports = router;
