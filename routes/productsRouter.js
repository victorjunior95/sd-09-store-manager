const express = require('express');
const productslRouter = express.Router();

const {
  registerProductController,
} = require('../controllers/productsController');

productslRouter.post('/', registerProductController);

module.exports = productslRouter;