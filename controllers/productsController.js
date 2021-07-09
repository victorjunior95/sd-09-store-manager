const express = require('express');
const productsServices = require('../services/productsServices');
const response = require('../middlewares/responseCodes');

const ProductsRouter = express.Router();

ProductsRouter.get('/', async(req, res) => {
  const products = await productsServices.getAllProducts();
  if(products.error) return res.status(response.INVALID_DATA).json(products);
  return res.status(response.STATUS_OK).json({products: products});
});

ProductsRouter.get('/:id', async (req, res) => {
  const searchedId = req.params.id;
  const foundProduct = await productsServices.getProductById(searchedId);
  if(foundProduct.err) return res.status(response.INVALID_DATA).json(foundProduct);
  return res.status(response.STATUS_OK).json(foundProduct);
});

ProductsRouter.post('/',
  async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = await productsServices.createNewProduct(name, quantity);
    if(newProduct.err) return res.status(response.INVALID_DATA).json(newProduct);
    return res.status(response.STATUS_CREATED).json(newProduct);
  });

ProductsRouter.put('/:id',
  async (req, res) => {
    const { name, quantity } = req.body;
    const id = req.params.id;
    const updatedProduct = await productsServices.updateProduct(name, quantity, id);
    if(updatedProduct.err) return res.status(response.INVALID_DATA).json(updatedProduct);
    return res.status(response.STATUS_OK).json(updatedProduct);
  });

module.exports = ProductsRouter;
