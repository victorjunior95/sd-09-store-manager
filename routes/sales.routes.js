const Router = require('express').Router();
const { createSales } = require('../controllers/sales.controller');

Router.route('/')
  .post(createSales);

module.exports = Router;
