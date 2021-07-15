const express = require('express');
const sales = require('../controllers/sales');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.sale, validate.stock, sales.create);
route.get('/', sales.getAll);
route.get('/:id', validate.saleExists, sales.getById);
route.put('/:id', validate.sale, sales.update);
route.delete('/:id', validate.saleId, sales.remove);

module.exports = route;
