const productsService = require('./products.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// validation
async function productExists(req, res, next) {
  const { productId } = req.params;
  const product = await productsService.read(productId);

  if (product) {
    res.locals.product = product;
    return next();
  }
  next({
    status: 404,
    message: `Product cannot be found.`,
  });
}

// handlers
async function list(req, res, next) {
  const data = await productsService.list();

  res.json({ data });
}

function read(req, res) {
  res.json({ data: res.locals.product });
}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
};
