const express = require('express');

const sales = require('../services/salesService');

const STATUS_200_OK = 200;

const create = ('/', async (req, res, next) => {
  try {
    const products = req.body;
    const result = await sales.create(products);
    res.status(STATUS_200_OK).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  create,
};