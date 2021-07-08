const express = require('express');

const products = require('../services/productsService');

const STATUS_201_CREATED = 201;

const create = ('/', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await products.create( { name, quantity });
    res.status(STATUS_201_CREATED).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  create,
};