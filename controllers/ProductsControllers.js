const express = require('express');
const {
  createService,
  getAllService,
  findByIdService,
  updateProductData,
  deleteProductService
} = require('../services/ProductsService');

const ProductsRouter = express.Router();
const numberStatusOk = 200;
const numberStatusErr = 422;

ProductsRouter.get('/', async (_req, res) => {

  const products = await getAllService();

  return res.status(numberStatusOk).json({ products });
});

ProductsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await findByIdService(id);
  if(product.err) return res.status(numberStatusErr).json(product);

  return res.status(numberStatusOk).json(product);
});

ProductsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const numberCreateok = 201;

  const newProduct = await createService(name, quantity);

  if (newProduct.err) return res.status(numberStatusErr).json(newProduct);

  return res.status(numberCreateok).json(newProduct);
});

ProductsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdated = await updateProductData(name, quantity, id);

  if(productUpdated.err) return res.status(numberStatusErr).json(productUpdated);

  return res.status(numberStatusOk).json({_id: id, name, quantity});
});

ProductsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const productDeleted = await deleteProductService(id);

  if(productDeleted.err) return res.status(numberStatusErr).json(productDeleted);

  return res.status(numberStatusOk).json(productDeleted);
});

module.exports = ProductsRouter;
