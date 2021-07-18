const router = require('express').Router();

const { minLenght, min } = require('../validators');
const { productModel } = require('../models');

function createProductValidator(req, res, next) {
  const { name, quantity } = req.body;
  const minNameLength = 5;
  if (minLenght(name, minNameLength)) {
    return res.invalidData('"name" length must be at least 5 characters long');
  }
  const minQuantityValue = 1;
  if (min(quantity, minQuantityValue)) {
    return res.invalidData('"quantity" must be larger than or equal to 1');
  }
  if (!Number(quantity)) {
    return res.invalidData('"quantity" must be a number');
  }
  return next();
}

router.post('/products', createProductValidator, async (req, res) => {
  const { name, quantity } = req.body;
  const productWithSameName = await productModel.findByName(name);
  if (productWithSameName) {
    return res.invalidData('Product already exists');
  }
  const createdProduct = await productModel.save({ name, quantity });
  return res.created(createdProduct);
});

router.get('/products', async (_req, res) => {
  const products = await productModel.findAll();
  return res.ok({ products });
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    return res.invalidData('Wrong id format');
  }
  return res.ok(product);
});

router.put('/products/:id', createProductValidator, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productModel.update({ id, name, quantity });
  return res.ok(updatedProduct);
});

router.delete('/products/:id', async (req, res) => {
  const {id} = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    return res.invalidData('Wrong id format');
  }
  await productModel.remove(id);
  return res.ok(product);
});

module.exports = router;
