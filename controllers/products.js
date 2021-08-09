const { products: productsServices } = require('../services');
const { httpCodes, AppError } = require('../utils');

exports.productsIndex = async (_req, res, next) => {
  try {
    const products = await productsServices.getAll();
    res.status(httpCodes.HTTP_OK).json({ products });
  } catch (error) {
    next(error);
  }
};

exports.productsGetId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productsServices.getID(id);
    res.status(httpCodes.HTTP_OK).json(product);
  } catch (error) {
    next(error);
  }
};
exports.productsCreate = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const products = await productsServices.create({ name, quantity });
    res.status(httpCodes.HTTP_CREATED).json(products.ops[0]);
  } catch (error) {
    next(error);
  }
};
