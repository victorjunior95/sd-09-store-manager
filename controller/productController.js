const service = require('../services/productService');

const OK = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await service.create(name, quantity);

  if (newProduct.error) return next(newProduct);

  res.status(CREATED).json(newProduct);
};

const getAll = async (req, res, next) => {
  const all = await service.getAll();

  res.status(OK).json(all);
};

module.exports = {
  create,
  getAll
};
