const Router = require('express').Router();
const {
  createSales,
  getSalesList,
  getSaleById,
  updateSales,
  deleteSaleById
} = require('../controllers/sales.controller');

Router.route('/')
  .get(getSalesList)
  .post(createSales);

Router.route('/:id')
  .put(updateSales)
  .delete(deleteSaleById)
  .get(getSaleById);

module.exports = Router;
