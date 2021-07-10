const express = require('express');

const products = require('../services/productsService');

const STATUS_201_CREATED = 201;
const STATUS_200_OK = 200;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await products.create({ name, quantity });
  res.status(STATUS_201_CREATED).json(result);
};

const findAll = async (_req, res) => {
  const result = await products.findAll();
  res.status(STATUS_200_OK).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await products.findById(id);
  res.status(STATUS_200_OK).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await products.update({ id, name, quantity });
  res.status(STATUS_200_OK).json(result);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const result = await products.exclude(id);
  res.status(STATUS_200_OK).json(result);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};
