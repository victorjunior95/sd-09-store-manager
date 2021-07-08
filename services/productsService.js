const { ObjectId } = require('mongodb');
const {
  registerProduct,
  findProduct,
  getAllProducts,
  getById,
  updateProductById,
  deleteProductById,
} = require('../models/productsModel');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

// errors
const nameError = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};
const quantityError = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};
const quantityIsNumberError = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};
const productExistsError = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};
const invalidIdError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
};
const productNotFoundError = {
  err: {
    code: 'not_found',
    message: 'Product not found',
  },
};
// 

const validateNameAndQuantity = (product) => {
  const { name, quantity } = product;
  const minNameLength = 5;
  const minQuantityLength = 1;
  if (typeof name !== 'string' || name.length < minNameLength) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: nameError };
  }
  if (!Number.isInteger(quantity)) {
    return {
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: quantityIsNumberError,
    };
  }
  if (quantity < minQuantityLength ) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: quantityError };
  }
  return true;
};

const registerProductService = async (product) => {
  const isValid = validateNameAndQuantity(product);
  if (isValid.code) return isValid;
  const productExists = await findProduct(product);
  
  if (productExists) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: productExistsError };
  };
  const registeredProduct = await registerProduct(product);
  return { code: HTTP_CREATED_STATUS, response: registeredProduct };
};

const getAllProductsService = async () => {
  const products = await getAllProducts();
  const obj = { products };
  return { code: HTTP_OK_STATUS, response: obj };
};

const getByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: invalidIdError };
  }
  const product = await getById(id);
  if (!product) {
    return { code: HTTP_NOT_FOUND_STATUS, response: productNotFoundError };
  }
  return { code: HTTP_OK_STATUS, response: product };
};

const updateProductByIdService = async (id, newInfos) => {
  const isValid = validateNameAndQuantity(newInfos);
  if (isValid.code) return isValid;
  if (!ObjectId.isValid(id)) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: invalidIdError };
  }
  const updatedProduct = await updateProductById(id, newInfos);
  return { code: HTTP_OK_STATUS, response: updatedProduct };
};

const deleteProductByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: invalidIdError };
  }
  const deletedProduct = await getById(id);
  if (!deletedProduct) {
    return { code: HTTP_NOT_FOUND_STATUS, response: productNotFoundError };
  }
  await deleteProductById(id);
  return { code: HTTP_OK_STATUS, response: deletedProduct };
};

module.exports = {
  registerProductService,
  getAllProductsService,
  getByIdService,
  updateProductByIdService,
  deleteProductByIdService,
};
