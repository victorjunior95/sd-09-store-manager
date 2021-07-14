const rescue = require('express-rescue');

const {
  createProductsService,
} = require('../services/productsServices');

const CREATED = 201;
const INVALID_DATA = 422;

const createProductController = rescue( async (req, res) => {
  const product = req.body;

  const result = await createProductsService(product);

  res.status(CREATED).json(result);
});

const createErrorProducts = (err, _req, _res, next) => {
  const newError = new Error();
  newError.code = 'invalid_data';
  newError.status = INVALID_DATA;
  newError.message = err.message;
  return next(newError);
};

module.exports = {
  createProductController,
  createErrorProducts,
};
