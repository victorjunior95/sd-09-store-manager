const { Router } = require('express');
const ProductController = require('../Controller/ProductController');

const ProductRoute = Router();

ProductRoute
  .get('/',ProductController.getAllProducts)
  .post('/', ProductController.createProduct);

ProductRoute
  .get('/:id', ProductController.getOneProduct)
  .put('/:id', ProductController.updateProduct)
  .delete('/:id', ProductController.deleteProduct);  

module.exports = ProductRoute;
