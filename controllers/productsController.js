const rescue = require('express-rescue');

const {
  createProductService,
  getProductsAllService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
} = require('../services/productsServices');

const OK = 200;
const CREATED = 201;
const INVALID_DATA = 422;

const createProductController = rescue(async (req, res) => {
  const product = req.body;
  const result = await createProductService(product);
  
  res.status(CREATED).json(result);
});

const getProductsAllController = async (_req, res) => {
  const result = await getProductsAllService();

  res.status(OK).json(result);
};

const getProductByIdController = rescue(async (req, res ) => {
  const productId = req.params.id;
  const result = await getProductByIdService(productId);

  res.status(OK).json(result);
});

const updateProductByIdController = rescue(async (req, res) => {
  const productId = req.params.id;
  const data = req.body;
  const result = await updateProductByIdService(productId, data);

  res.status(OK).json(result);
});

const deleteProductByIdController = rescue(async (req, res) => {
  const productId = req.params.id;
  const result = await deleteProductByIdService(productId);

  res.status(OK).json(result);
});

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
  getProductsAllController,
  getProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
  createErrorProducts,
  errorProducts,
};
