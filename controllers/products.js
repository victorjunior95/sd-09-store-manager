const { products: productsServices } = require('../services');
const { httpCodes } = require('../utils');

exports.productsIndex = async (_req, res, next) => {
  try {
    const products = await productsServices.getAllService();
    res.status(httpCodes.HTTP_OK).json({ products });
  } catch (error) {
    next(error);
  }
};

exports.productsGetId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productsServices.getByIdService(id);
    res.status(httpCodes.HTTP_OK).json(product);
  } catch (error) {
    next(error);
  }
};
exports.productsCreate = async (req, res, next) => {
  const { name, quantity } = req.body;
  try {
    const products = await productsServices.createService({ name, quantity });
    res.status(httpCodes.HTTP_CREATED).json(products.ops[0]);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body: newInfo } = req;
    const updatedProduct = await productsServices.updateProductService(id, newInfo);
    const newProductInfo = await productsServices.getByIdService(id);
    res.status(httpCodes.HTTP_OK).json(newProductInfo);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct =  async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsServices.deleteProductService(id);
    res.status(httpCodes.HTTP_OK).json(deletedProduct);
  } catch (error) {
    next(error);
  }
};
