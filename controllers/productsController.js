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
  async (req, res, next) => {
    try {
      const newProduct = await productsServices.createNewProduct(req.body);
      return res.status(response.STATUS_CREATED).json(newProduct);
    } catch (error) {
      return next(error);
    }
    // if(newProduct.err) return res.status(response.INVALID_DATA).json(newProduct);
  });

ProductsRouter.put('/:id',
  async (req, res, next) => {
    try {
      const { name, quantity } = req.body;
      const id = req.params.id;
      const updatedProduct = await productsServices.updateProduct(name, quantity, id);
      return res.status(response.STATUS_OK).json(updatedProduct);
    } catch (error) {
      return next(error);
    }
    // if(updatedProduct.err) return res.status(response.INVALID_DATA).json(updatedProduct);
  });

ProductsRouter.delete('/:id',
  async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await productsServices.deleteProduct(id);
    if(deletedProduct.err) return res.status(response.INVALID_DATA).json(deletedProduct);
    return res.status(response.STATUS_OK).json(deletedProduct);
  });

module.exports = ProductsRouter;
