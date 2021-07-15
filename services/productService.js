const productModel = require('../models/productModel');

let objectErr = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

// confere de sem outro produdo igual
const checkProduct = async (name) => {
  const selectProduct = await productModel.findProduct(name);
  if(selectProduct) {
    objectErr.err.message = 'Product already exists';
    return objectErr;
  }
};

const checkName = (name) => {
  const nameMin = 5;
  if(name.length < nameMin) {
    objectErr.err.message = '"name" length must be at least 5 characters long';
    return objectErr;
  }
};

const checkQuantity = (quantity) => {
  const minimal = 1;
  if(quantity < minimal) {
    objectErr.err.message = '"quantity" must be larger than or equal to 1';
    return objectErr;
  };
  if(typeof quantity !== 'number') {
    objectErr.err.message = '"quantity" must be a number';    
    return objectErr;
  };
};


const createProduct = async (name, quantity) => {
  const validProduct = await checkProduct(name);
  if(validProduct) return validProduct;

  const validName = checkName(name);
  if(validName) return validName;

  const validQuantity = checkQuantity(quantity);
  if(validQuantity) return validQuantity;

  const newProduct = await productModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  createProduct,
};
