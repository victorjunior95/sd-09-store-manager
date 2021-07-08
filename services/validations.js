const { findProductByName } = require('../models/productsModel');

const errors = {
  invalidData: 'invalid_data',
  nameLength: '"name" length must be at least 5 characters long',
  quantityIsNumber: '"quantity" must be a number',
  quantityMinValue: '"quantity" must be larger than or equal to 1'
};
const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;

async function validateName(name) {
  const mimNameLength = 5;
  
  if (name.length < mimNameLength ) throw { 
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: errors.invalidData,
      message: errors.nameLength,
    }
  };

  const result = await findProductByName(name);

  if (result) throw {
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: errors.invalidData,
      message: 'Product already exists'
    }
  };
}

function validateQuantity(quantity) {
  const minQuantity = 1;

  if (typeof quantity !== 'number') throw {
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: errors.invalidData,
      message: errors.quantityIsNumber,
    }
  };

  if (quantity < minQuantity) throw {
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: errors.invalidData,
      message: errors.quantityMinValue,
    }
  };
}

module.exports = {
  validateName,
  validateQuantity,
};
