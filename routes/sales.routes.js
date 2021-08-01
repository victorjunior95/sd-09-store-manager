const Router = require('express').Router();
const {
  createSales,
  getSalesList,
  getSaleById
} = require('../controllers/sales.controller');

Router.route('/')
  .get(getSalesList)
  .post(createSales);

Router.route('/:id')
  .get(getSaleById);

module.exports = Router;
