const ProductService = require('../services/productService');

const STATUS_HTTP_200 = 200;
const STATUS_HTTP_201 = 201;
const STATUS_HTTP_422 = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductService.create(name, quantity);

  if (!product.err) {
    return res.status(STATUS_HTTP_201).json(product);
  };
  return res.status(STATUS_HTTP_422).json(product);
};

const getAll = async (req, res) => {
  const products = await ProductService.getAll();
  return res.status(STATUS_HTTP_200).json(products);
};

const findById = async (req, res) => {
  const product = await ProductService.findById(req.params.id);

  if (!product.err) {
    return res.status(STATUS_HTTP_200).json(product);
  };

  return res.status(STATUS_HTTP_422).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body; 
  const product = await ProductService.update(id, name, quantity);

  if (!product.err) {
    return res.status(STATUS_HTTP_200).json(product);
  };

  return res.status(STATUS_HTTP_422).json(product);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.exclude(id);

  if (!product.err) {
    return res.status(STATUS_HTTP_200).json(product);
  };

  return res.status(STATUS_HTTP_422).json(product);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};
