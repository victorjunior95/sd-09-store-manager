const productsSchema = require('../schemas/Products');
const rescue = require('express-rescue');
const { getAll } = require('../models/Products');

const createValidator = async(req, res, next) => {
  const { name, quantity } = req.body;
  const isValid = await productsSchema.createValidator(name, quantity);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

module.exports = { createValidator };