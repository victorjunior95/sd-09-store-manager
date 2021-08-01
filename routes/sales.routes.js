const Router = require('express').Router();
const {
  createSales,
  getSalesList,
  getSaleById,
  updateSales
} = require('../controllers/sales.controller');

Router.route('/')
  .get(getSalesList)
  .post(createSales);

Router.route('/:id')
  .put(updateSales)
  .get(getSaleById);

module.exports = Router;
