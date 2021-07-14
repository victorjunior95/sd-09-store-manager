const express = require('express');
const getSale = require('./middlewares/getSale');
const getSales = require('./middlewares/getSales');
const putSale = require('./middlewares/putSale');

const postSale = require('./middlewares/postSale');
const deleteSale = require('./middlewares/deleteSale');

const route = express.Router();


route.get('/', getSales);

route.get('/:id', getSale);

route.post('/', postSale);

route.put('/:id', putSale);

route.delete('/:id', deleteSale);

module.exports = route;
