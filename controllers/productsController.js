const express = require('express');
const rescue = require('express-rescue');
const router = express.Router();

const serviceProducts = require('../services/productsServices');

const { 
  validateProduct, 
  validateProductId 
} = require('../middlewares/productsMiddleware');
const error = require('../schemas/errorsSchema');

router.get('/', rescue(async (_req, res) => {
  const products  = await serviceProducts.getAllProducts();

  if(!products) return res.status(error.NOT_FOUND).send({ message: 'Not found' });

  return res.status(error.OK).send(products);
}));

router.get('/:id', validateProductId, rescue(async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.getProductById(id);

  return res.status(error.OK).send(product);
}));

router.delete('/:id', validateProductId, rescue(async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.getProductById(id);
  await serviceProducts.deleteProductById(id);
  
  return res.status(error.OK).send(product);
}));

router.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { _id, err } = await serviceProducts.createProduct(name, quantity);

  if(err) return res.status(error.UNPROCESSABLE_ENTITY).send({ err });

  return res.status(error.CREATED).send({ _id, name, quantity });
}));

router.put('/:id', validateProduct, validateProductId, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await serviceProducts.updateProductById(id, name, quantity);

  const product = await serviceProducts.getProductById(id);

  return res.status(error.OK).send(product);
}));

module.exports = router;
