const express = require('express');
const { validateProduct } = require('../middlewares/ProductsMiddlewares');
const { create } = require('../controllers/ProductsController');


const ProductsRouter = express.Router();

ProductsRouter.post('/', validateProduct, create);

module.exports = ProductsRouter;
