const express = require('express');
const response = require('../middlewares/responseCodes');
const mw = require('../middlewares/index');
const {
  getAllProducts,
  addNewProduct,
} = require('../models/productsModel');

const ProductsRouter = express.Router();
ProductsRouter.get('/', async(req, res) => {
  const products = await getAllProducts();
  if(products.error) return next(products);
  return res.status(response.STATUS_OK).json(products);
});

ProductsRouter.post('/',
  mw.validateName,
  mw.validateQuantity,
  async (req, res) => {
    const newProduct = await addNewProduct(req.body);
    return res.status(response.STATUS_CREATED).json(newProduct);
  });

// app.get('/products/:id', async (req, res, next) => {
//   const searchProduct = await getProductById(req.params.id);
//   console.log(searchProduct);
//   if(searchProduct.error) return next(searchProduct);
//   return res.status(response.STATUS_OK).json(searchProduct);
// });

module.exports = ProductsRouter;
