const { createProduct, findByName, getAll } = require('../models/ProductsModel');

const objErrorToReturn = (typeError) => {
  return {
    err: {
      code: 'invalid_data',
      message: typeError,
    },
  };
};

const getAllService =  () => getAll();
const createService = async (name, quantity) => {
  const numberToComperName = 5;

  if (name.length < numberToComperName) {
    return objErrorToReturn('"name" length must be at least 5 characters long');
  }
  if (quantity < 1) {
    return objErrorToReturn('"quantity" must be larger than or equal to 1');
  }
  if(typeof quantity === 'string') {
    return objErrorToReturn('"quantity" must be a number');
  }
  if (await findByName(name)) {
    return objErrorToReturn('Product already exists');
  }

  const newProduct = await createProduct(name, quantity);
  return newProduct;
};

module.exports = {
  createService,
  getAllService
};
