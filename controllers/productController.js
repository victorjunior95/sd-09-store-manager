const ProductService = require('../services/productService');
const { CREATED, OK } = require('../httpCodes');

const create =  async (req, res, next) => {
  const { name, quantity } = req.body;

  const response = await ProductService.create({ name, quantity });

  if (response.err) return next(response.err);

  return res.status(CREATED).json(response);
};

const getAll = async (_req, res) => {
  const response = await ProductService.getAll();

  return res.status(OK).json(response);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductService.findById(id);

  return product.err
    ? next(product.err)
    : res.status(OK).json(product);
};

const updateById = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductService.updateById(id, { name, quantity });

  return res.status(OK).json(product);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductService.deleteById(id);

  return product.err
    ? next(product.err)
    : res.status(OK).json(product);
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
