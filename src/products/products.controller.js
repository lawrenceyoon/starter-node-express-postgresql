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
async function list(req, res) {
  const data = await productsService.list();

  res.json({ data });
}

function read(req, res) {
  res.json({ data: res.locals.product });
}

async function listOutOfStockCount(req, res) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

async function listPriceSummary(req, res) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

//
async function tryingOutDemo(req, res) {
  const data = await productsService.tryingOutDemo();
  console.log(data);

  //res.json({ data: { average_rating: Number(data.avg) } });
  for (let item of data) {
    item.avg = Number(item.avg);
  }
  res.json({ data: data });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
  //
  tryingOutDemo: asyncErrorBoundary(tryingOutDemo),
};
