const productModel = require('../models/productModel');

let err = {
  code: 'invalid_data',
  message: ''
};

// confere se tem outro produdo igual
const checkProduct = async (name) => {
  const selectProduct = await productModel.findName(name);
  if(selectProduct) {
    err.message = 'Product already exists';
    return { err };
  };
};

const checkName = (name) => {
  const nameMin = 5;
  if(name.length < nameMin) {
    err.message = '"name" length must be at least 5 characters long';
    return { err };
  };
};

const checkQuantity = (quantity) => {
  const minimal = 1;
  if(quantity < minimal) {
    err.message = '"quantity" must be larger than or equal to 1';
    return { err };
  };
  if(typeof quantity !== 'number') {
    err.message = '"quantity" must be a number';    
    return { err };
  };
};

const checkId = async (id) => {
  const selectProduct = await productModel.findId(id);
  if(!selectProduct) {
    err.message = 'Wrong id format';
    return { err };
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

const productsList = async () => {
  const products = await productModel.showAll();
  return { products };
};

// procura produto por id
const findProduct = async (id) => {
  const validId = await checkId(id);
  if(validId) return validId;

  const product = await productModel.findId(id);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const validName = checkName(name);
  if(validName) return validName;

  const validQuantity = checkQuantity(quantity);
  if(validQuantity) return validQuantity;

  const newProduct = await productModel.update(id, name, quantity);
  return newProduct;
};

const deleteProduct = async (id) => {
  const selectProduct = await findProduct(id);
  if(selectProduct.err) return selectProduct;
  
  const product = await productModel.drop(id);
  return product && selectProduct;
};

module.exports = {
  createProduct,
  productsList,
  findProduct,
  updateProduct,
  deleteProduct,
};
