const service = require('../services/productService');

const OK = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await service.create(name, quantity);

  if (newProduct.error) return next(newProduct);

  res.status(CREATED).json(newProduct);
};

const getAll = async (_req, res, _next) => {
  const all = await service.getAll();

  res.status(OK).json({ products: all });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const product = await service.getById(id);

  if (product.error) return next(product);

  res.status(OK).json(product);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updateProduct = await service.update(id, name, quantity);

  if (updateProduct.error) return next(updateProduct);

  return res.status(OK).json(updateProduct);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
