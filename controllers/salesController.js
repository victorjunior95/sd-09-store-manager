const express = require('express');

const sales = require('../services/salesService');

const STATUS_200_OK = 200;

const create = async (req, res) => {
  const products = req.body;
  const result = await sales.create(products);
  res.status(STATUS_200_OK).json(result);
};

const findAll = async (_req, res) => {
  const result = await sales.findAll();
  res.status(STATUS_200_OK).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await sales.findById(id);
  res.status(STATUS_200_OK).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const products = req.body;
  const result = await sales.update(id, products);
  res.status(STATUS_200_OK).json(result);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};