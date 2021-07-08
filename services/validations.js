const { findProductByName } = require('../models/productsModel');
const errors = require('./errorsMessage');
const { unprocessableEntity } = require('./httpStatusCode');

const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;

async function validateName(name) {
  const mimNameLength = 5;
  
  if (name.length < mimNameLength ) throw { 
    status: unprocessableEntity,
    err: {
      code: errors.invalidData,
      message: errors.nameLength,
    }
  };

  const result = await findProductByName(name);

  if (result) throw {
    status: unprocessableEntity,
    err: {
      code: errors.invalidData,
      message: 'Product already exists'
    }
  };
}

function validateQuantity(quantity) {
  const minQuantity = 1;

  if (typeof quantity !== 'number') throw {
    status: unprocessableEntity,
    err: {
      code: errors.invalidData,
      message: errors.quantityIsNumber,
    }
  };

  if (quantity < minQuantity) throw {
    status: unprocessableEntity,
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
