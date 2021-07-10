const ProductModel = require('../models/productModel');

const MIN_LENGTH_NAME = 5;
const MIN_QTY = 0;

const getAll = async () => {
  let products = await ProductModel.getAll();
  return { products };
};

const findById = async (id) => {
  let product = await ProductModel.findById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  };
  return product;
};

const findByName = async (name) => {
  let product = await ProductModel.findByName(name);
  return product;
};

const create = async (name, quantity) => {
  let alreadyExists = await ProductModel.findByName(name);
  
  if (alreadyExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    };
  };

  if (name.length <= MIN_LENGTH_NAME ) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    };
  };

  if (quantity <= MIN_QTY) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    };
  };

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    };
  };

  return ProductModel.create(name, quantity);
};

const update = async (id, name, quantity) => {
  if (name.length <= MIN_LENGTH_NAME ) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    };
  };

  if (quantity <= MIN_QTY) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    };
  };

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    };
  };

  return { _id: id, name, quantity };
};

const exclude = async (id) => {
  let product = await ProductModel.exclude(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  };

  return { _id: id };
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  exclude,
};
