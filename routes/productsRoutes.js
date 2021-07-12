const express = require('express');
const productsRoutes = express.Router();

const {
  registerProductController,
  findProductController,
  updateProductController,
  deleteProductController,
} = require('./controllers/productsControllers');

const {
  registerProduct,
  listAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
} = require('./services');

productsRoutes.post('/products', registerProduct, registerProductController);
productsRoutes.get('/products', listAllProducts);
productsRoutes.get('/products/:id', findProduct, findProductController);
productsRoutes.put('/products/:id', updateProduct, updateProductController);
productsRoutes.delete('/products/:id', deleteProduct, deleteProductController);

module.exports = productsRoutes;
