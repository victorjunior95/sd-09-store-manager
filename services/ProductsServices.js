const { ObjectId } = require('mongodb');
const ProductsModel = require('../models/ProductsModel');
const errorObject = require('../utils/errorObject');

const create = async (name, quantity) => {
  const productExists = await ProductsModel.findByQuery({ name });

  if (productExists) return errorObject('invalid_data', 'Product already exists');

  const { ops: [newProduct] } = await ProductsModel.create(name, quantity);
  return newProduct;
};

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return { products };
};

const getById = async (id) => ProductsModel.findByQuery(ObjectId(id));

module.exports = {
  create,
  getAll,
  getById,
};
