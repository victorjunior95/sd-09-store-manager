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
    result: {
      err: {
        code: 'invalid_data',
        message,
      },
    },
  }
);

const verifyIfExists = async (name) => {
  const products = await ProductsModel.find();
  const currentProduct = products.find((e) => e.name === name);
  if (currentProduct !== undefined) return true;
  return false;
};

const createProductError = () => {
  const code = 422;
  msg = 'Product already exists';
  const error = createErrorMsg(code, msg);
  return error;
};

const createNameError = () => {
  const code = 422;
  msg = '"name" length must be at least 5 characters long';
  const error = createErrorMsg(code, msg);
  return error;
};

const createTypeQuantityError = () => {
  const code = 422;
  msg = '"quantity" must be a number';
  const error = createErrorMsg(code, msg);
  return error;
};

const createQuantityError = () => {
  const code = 422;
  msg = '"quantity" must be larger than or equal to 1';
  const error = createErrorMsg(code, msg);
  return error;
};

const addProduct = async (name, quantity) => {
  const productExist = await verifyIfExists(name);
  if (productExist) {
    return createProductError();
  }
  if (!validName(name)) {
    return createNameError();
  }
  if (typeof quantity !== 'number') {
    return createTypeQuantityError();
  }
  if (!validQuantity(quantity)) {
    return createQuantityError();
  } 

  const result = await ProductsModel.create(name, quantity);
  return { status: 201, result: result.ops[0] };
};


const editProduct = async (id, name, quantity) => {
  try {
    if (!validName(name)) {
      return createNameError();
    }
    if (typeof quantity !== 'number') {
      return createTypeQuantityError();
    }
    if (!validQuantity(quantity)) {
      return createQuantityError();
    }

    const response = await ProductsModel.update(id, name, quantity);
    return ({ status: 200, result: response });

  } catch (e) {
    console.log('no catch');
    if (e.message.includes('Argument passed')) {
      const code = 422;
      msg = 'Wrong id format';
      const error = createErrorMsg(code, msg);
      return error;
    }
  }  
};

const deleteProduct = async (id) => {
  try {
    const currentProduct = await ProductsModel.find(id);
    const _id = await ProductsModel.exlude(id);
    return (
      {
        status: 200,
        result: {
          _id,
          name: currentProduct.name,
          quantity: currentProduct.quantity
        },
      });

  } catch (e) {
    console.log('no catch');
    if (e.message.includes('Argument passed')) {
      const code = 422;
      msg = 'Wrong id format';
      const error = createErrorMsg(code, msg);
      return error;
    }
  }  
};

const listProducts = async (id) => {
  try {
    if (id === undefined) {
      const response = await ProductsModel.find(id);
      return { status: 200, result: { products: response } };
    }
    const responseById = await ProductsModel.find(id);
    return { status: 200, result: responseById };
  } catch (e) {
    console.log('no catch');
    if (e.message.includes('Argument passed')) {
      const code = 422;
      msg = 'Wrong id format';
      const error = createErrorMsg(code, msg);
      return error;
    }
  }  
};

module.exports = {
  addProduct,
  listProducts,
  editProduct,
  deleteProduct,
};