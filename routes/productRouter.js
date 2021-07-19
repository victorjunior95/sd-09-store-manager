const express = require('express');
const productController = require('../controllers/productController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  middlewares.nameValidation,
  async (req, res, next) => middlewares.uniqueNameValidation(req, res, next),
  middlewares.quantityValidation,
  async (req, res) => await productController.create(req, res),
);

router.get('/', async (req, res) => await productController.getAll(req, res));

router.get(
  '/:id',
  middlewares.idValidation,
  async (req, res) => await productController.getProductById(req, res),
);

router.put(
  '/:id',
  middlewares.nameValidation,
  async (req, res, next) => middlewares.uniqueNameValidation(req, res, next),
  middlewares.quantityValidation,
  middlewares.idValidation,
  async (req, res) => await productController.updateProduct(req, res),
);

router.delete(
  '/:id',
  middlewares.idValidation,
  async (req, res) => await productController.deleteProduct(req, res),
);

module.exports = router;
