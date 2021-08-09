const products = require('../services/products');

const postProduct = (request, response) => products
  .postProduct(request.body)
  .then(({status, data}) => response.status(status).json(data));

const getAllProducts = (request, response) => products
  .getAllProducts(request.body)
  .then(({status, data}) => response.status(status).json(data));

const getProductById = (request, response) => products
  .getProductById(request.params.id, request.body)
  .then(({status, data}) => response.status(status).json(data));

const putProduct = (request, response) => products
  .putProduct(request.body)
  .then(({status, data}) => response.status(status).json(data));

const deleteProduct = (request, response) => products
  .deleteProduct(request.body)
  .then(({status, data}) => response.status(status).json(data));

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  putProduct,
  deleteProduct,
};
