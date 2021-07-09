const Products = require('../services/ProductsService');

const STATUS_201 = 201;
const STATUS_200 = 200;

const addNewProduct = async (req, res, next) => {
  const product = await Products.newProduct(req.body);

  if (product.err) return next(product);

  res.status(STATUS_201).json(product);
};

const getAll = async (req, res, next) => {
  const products = await Products.getAll();

  res.status(STATUS_200).json({ products });  
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.getOne(id);

  if (product.err) return next(product);

  res.status(STATUS_200).json(product);  
};

module.exports = {
  addNewProduct,
  getAll,
  getOne,
};