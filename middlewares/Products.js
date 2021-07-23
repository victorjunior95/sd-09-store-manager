const productsSchema = require('../schemas/Products');
const rescue = require('express-rescue');
const { getAll } = require('../models/Products');

const createValidator = async (req, res, next) => {
  const { name, quantity } = req.body;
  const isValid = await productsSchema.createValidator(name, quantity);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

const idValidator = async (req, res, next) => {
  const { id } = req.params;
  const isValid = await productsSchema.idValidator(id);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

module.exports = { createValidator, idValidator };