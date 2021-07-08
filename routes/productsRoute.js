const express = require('express');

const { postProductToDB } = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.post('/', postProductToDB);

module.exports = productsRoute;