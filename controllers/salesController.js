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

const findAll = ('/', async (_req, res, next) => {
  try {
    const result = await sales.findAll();
    res.status(STATUS_200_OK).json(result);
  } catch (error) {
    next(error);
  }
});

const findById = ('/', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await sales.findById(id);
    res.status(STATUS_200_OK).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  create,
  findAll,
  findById,
};