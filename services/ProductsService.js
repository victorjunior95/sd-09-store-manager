const ProductsModel = require('../models/ProductsModel');

const validName = (name) => {
  const minLength = 5;
  if (name === undefined) return false;
  if (name.length < minLength) return false;
  return true;
};

const validQuantity = (quantity) => {
  const minQuantity = 0;
  if (quantity === undefined) return false;
  if (quantity <= minQuantity) return false;
  return true;
};

const createErrorMsg = (status, message) => (
  {
    status,
    err: {
      code: 'invalid_data',
      message,
    },
  }
);

const verifyIfExists = async (name) => {
  const products = await ProductsModel.find();;
  const currentProduct = products.find((e) => e.name === name);
  if (currentProduct !== undefined) return true;
  return false;
};

const addProduct = async (name, quantity) => {
  const productExist = await verifyIfExists(name);
  if (productExist) {
    const code = 422;
    msg = 'Product already exists';
    const error = createErrorMsg(code, msg);
    return error;
  }
  if (!validName(name)) {
    const code = 422;
    msg = '"name" length must be at least 5 characters long';
    const error = createErrorMsg(code, msg);
    return error;
  }
  if (typeof quantity !== 'number') {
    const code = 422;
    msg = '"quantity" must be a number';
    const error = createErrorMsg(code, msg);
    return error;
  }
  if (!validQuantity(quantity)) {
    const code = 422;
    msg = '"quantity" must be larger than or equal to 1';
    const error = createErrorMsg(code, msg);
    return error;
  } 

  const result = await ProductsModel.create(name, quantity);
  return result.ops[0];
};

const listProducts =  () => ProductsModel.find();


module.exports = {
  addProduct,
  listProducts,
};