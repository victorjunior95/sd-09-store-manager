const ProductsModel = require('../models/ProductsModel');
const errorObject = require('../utils/errorObject');

const create = async (name, quantity) => {
  const productExists = await ProductsModel.findByName(name);

  if (productExists) return errorObject('invalid_data', 'Product already exists');

  const { ops: [newProduct] } = await ProductsModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  create,
};
