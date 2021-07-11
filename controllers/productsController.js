const express = require('express');
const productsService = require('../services/productsService');

const ProductsRouter = express.Router();

const HTTP_SERVERERROR_STATUS = 500;

ProductsRouter.post('/', async (req, res, _next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.create(name, quantity);

    if (newProduct.err)
      return res.status(newProduct.status).json({ err: newProduct.err });
    return res.status(newProduct.status).json(newProduct.product);
  } catch (err) {
    return res.status(HTTP_SERVERERROR_STATUS).json(err);
  }
});

// no router já esta no /products aqui fica como se fosse
// /product/
ProductsRouter.get('/', async (_req, res) => {
  try {
    const productsAll = await productsService.listAll();
    return res.status(productsAll.status).json(productsAll.products);
  } catch (err) {
    return res.status(HTTP_SERVERERROR_STATUS).json(err);
  }
});

ProductsRouter.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  try {
    const productReturn = await productsService.getProductById(id);
    if(productReturn.err)
      return res.status(productReturn.status).json({ err: productReturn.err });
    return res.status(productReturn.status).json(productReturn.product); 
  } catch (err) {
    return res.status(HTTP_SERVERERROR_STATUS).json(err);
  }
});

ProductsRouter.put('/:id', async (req, res, _next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  
  const product = await productsService.update(id, name, quantity);
  try {
    if(product.err) {
      return res.status(product.status).json({ err: product.err });
    }
    return res.status(product.status).json(product.product);
  } catch (error) {
    return res.status(HTTP_SERVERERROR_STATUS).json(error);
  }
});

ProductsRouter.delete('/:id', async (req, res, _next) => {
  const { id } = req.params;
  try {
    const productDeleted = await productsService.exclude(id);
    if (productDeleted.err) {
      return res.status(productDeleted.status).json({ err: productDeleted.err });
    }
    return res.status(productDeleted.status).json(productDeleted.product);
  } catch (error) {
    return res.status(HTTP_SERVERERROR_STATUS).json(error);
  }
});

module.exports = ProductsRouter;
