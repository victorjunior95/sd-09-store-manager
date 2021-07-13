const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');
const {
  validateProductData,
  validateProductId
} = require('../middlewares/productsMiddleware');

const responseCodes = {
  success: 200,
  created: 201,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

router.get('/', async (_req, res) => {
  const productsList = await productsService.getAll();
  res.status(responseCodes.success).json({ products: productsList });
});

router.get('/:id', validateProductId, async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
  res.status(responseCodes.success).json(product);
});

router.post('/', validateProductData, async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct(name, quantity);
  res.status(responseCodes.created).json(product);
});

router.put('/:id', validateProductData, async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const product = await productsService.updateProduct(id, name, quantity);
  res.status(responseCodes.success).json(product);
});

router.delete('/:id', validateProductId, async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct(id);
  res.status(responseCodes.success).json(product);
});

module.exports = router;
