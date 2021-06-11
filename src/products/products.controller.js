const productsService = require('./products.service');

// validation
function productExists(req, res, next) {
  const { productId } = req.params;

  productsService
    .read(productId)
    .then((product) => {
      if (product) {
        res.locals.product = product;
        return next();
      }
      next({ status: 404, message: `Product cannot be found.` });
    })
    .catch(next);
}

// handlers
function list(req, res, next) {
  productsService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

function read(req, res) {
  res.json({ data: res.locals.product });
}

module.exports = {
  read: [productExists, read],
  list,
};
