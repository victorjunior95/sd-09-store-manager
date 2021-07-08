const express = require('express');

const products = require('../services/productsService');

const STATUS_201_CREATED = 201;
const STATUS_200_OK = 200;

const create = ('/', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await products.create( { name, quantity });
    res.status(STATUS_201_CREATED).json(result);
  } catch (error) {
    next(error);
  }
});

const findAll = ('/', async (_req, res, next) => {
  try {
    const result = await products.findAll();
    res.status(STATUS_200_OK).json(result);
  } catch (error) {
    next(error);
  }
});

const findById = ('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await products.findById(id);
    res.status(STATUS_200_OK).json(result);
  } catch (error) {
    next(error);
  }
});

const update = ('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await products.update({ id, name, quantity });
    res.status(STATUS_200_OK).json(result);
  } catch (error) {
    next(error);
  }
});

const exclude = ('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await products.exclude(id);
    res.status(STATUS_200_OK).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};