const rescue = require('express-rescue');

const {
  createProductsService,
  getProductsService,
  getProductByIdService,
} = require('../services/productsServices');

const CREATED = 201;
const OK = 200;
const INVALID_DATA = 422;

const createProductController = rescue( async (req, res) => {
  const product = req.body;

  const result = await createProductsService(product);

  res.status(CREATED).json(result);
});

const getProducts = async (_req, res) => {
  const result = await getProductsService();

  res.status(OK).json(result);
};

const getProductById = async (req, res ) => {
  const productId = req.params.id;

  const result = await getProductByIdService(productId);

  if (result.err) {
    return res.status(INVALID_DATA).json(result);
  };

  res.status(OK).json(result);
};

const createErrorProducts = (err, _req, _res, next) => {
  const newError = new Error();
  newError.code = 'invalid_data';
  newError.status = INVALID_DATA;
  newError.message = err.message;
  return next(newError);
};

const errorProducts = (err, _req, res, _next) => {
  res.status(`${err.status}`).json({ err: { code: err.code, message: err.message }});
};

module.exports = {
  createProductController,
  getProducts,
  getProductById,
  createErrorProducts,
  errorProducts,
};
