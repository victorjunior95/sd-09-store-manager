const Product = require('../models/Products');
const { ObjectId } = require('mongodb');

const nameLength = 5;
const quantitySize = 0;

const validateData = async (name, quantity) => {

  if (name.length < nameLength) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const existingProduct = await Product.findByName(name);

  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    };
  }

  if (quantity < quantitySize || quantity == quantitySize) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if (typeof(quantity) !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    };
  }
};

const create = async (name, quantity) => {

  const data = await validateData(name, quantity);

  if (data) return data;

  return Product.create(name, quantity);
};

const listProducts = async () => {
  return Product.listProducts();
};

const getProductById = async (id) => {

  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  }
  const product = await Product.getProductById(id);

  return product;
};

const updateProduct = async (id, name, quantity) => {

  const data = await validateData(name, quantity);

  console.log(data);
  if (data) return data;

  return Product.getProductByIdAndUpdate(id, name, quantity);
};

module.exports = {
  create,
  listProducts,
  getProductById,
  updateProduct,
};
