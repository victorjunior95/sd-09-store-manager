const express = require('express');
const SalesController = require('../controllers/SalesController');

const SalesRouter = express.Router();

SalesRouter.post('/', SalesController.addNewSale);

module.exports = SalesRouter;
