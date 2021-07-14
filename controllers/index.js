const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products/products');
const sales = require('./routes/sales/sales');
const errorMiddleware = require('./middlewares/errorMiddleware');

const route = express.Router();

route.use(bodyParser());

route.use('/products', products);
route.use('/sales', sales);

route.use(errorMiddleware);

module.exports = route;
