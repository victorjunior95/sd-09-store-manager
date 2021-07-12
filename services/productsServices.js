const productsModel = require('../models/productsModel');

function validateName(name){
  const minimumSize = 5;
  if (name.length < minimumSize) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
      },
    };
  }
}

async function validateNameExists(name) {
  const product = await productsModel.getProductByName(name);
  if (product) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  }
}

function validateQuantity(quantity){
  const minimumQuantity = 1;
  if (parseInt(quantity, 10) < minimumQuantity) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      },
    };
  }
  if (Number.isNaN(+quantity)) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
      },
    };
  }
}

function validateProduct(product) {
  if (!product) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    };
  }
}

async function validateIdExists(id) {
  const product = await productsModel.getProductById(id);
  if (!product) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    };
  }
}

async function addProduct(name, quantity) {
  validateName(name);
  await validateNameExists(name);
  validateQuantity(quantity);
  const result = await productsModel.addProduct(name, quantity);
  return { status: 201, result };
}

async function getProducts() {
  const result = await productsModel.getProducts();
  return { status: 200, result };
}

async function getProductById(id) {
  const result = await productsModel.getProductById(id);
  validateProduct(result);
  return { status: 200, result };
}

async function updateProduct(id, name, quantity) {
  validateName(name);
  validateQuantity(quantity);
  await productsModel.updateProduct(id, name, quantity);
  return { status: 200, result: { _id: id, name, quantity } };
}

async function deleteProduct(id) {
  await validateIdExists(id);
  const result = await productsModel.deleteProduct(id);
  return { status: 200, result };
}

async function decreaseQuantity(id, quantity) {
  const product = await productsModel.getProductById(id);
  const newQuantity = product.quantity - quantity;
  await productsModel.updateQuantity(id, newQuantity);
}

async function increaseQuantity(id, quantity) {
  const product = await productsModel.getProductById(id);
  const newQuantity = product.quantity + quantity;
  await productsModel.updateQuantity(id, newQuantity);
}

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  decreaseQuantity,
  increaseQuantity,
};
