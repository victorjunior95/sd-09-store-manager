const {
  registerProduct,
  findProduct,
} = require('../models/productsModel');

const HTTP_OK_STATUS = 200;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

const validateNameAndQuantity = (product) => {
  const { name, quantity } = product;
  const minNameLength = 5;
  const minQuantityLength = 1;
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
  const productExistsError = {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  };
  if (productExists) {
    return { code: HTTP_UNPROCESSABLE_ENTITY_STATUS, response: productExistsError };
  };
  const registeredProduct = await registerProduct(product);
  return { code: HTTP_OK_STATUS, response: registeredProduct };
};

module.exports = {
  registerProductService,
};
