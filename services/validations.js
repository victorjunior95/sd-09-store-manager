const { findProductByName, findProductByIdFromDB } = require('../models/productsModel');
const errors = require('./errorsMessage');
const { unprocessableEntity } = require('./httpStatusCode');

const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;

function validateNameLength(name) {
  const mimNameLength = 5;
  
  if (name.length < mimNameLength ) throw { 
    status: unprocessableEntity,
    err: {
      code: errors.invalidData,
      message: errors.nameLength,
    }
  };
}

async function validateProductExists(name) {
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

function validateSaleQuantity(quantity) {
  const minQuantity = 1;

  if (typeof quantity !== 'number' || quantity < minQuantity) throw {
    status: unprocessableEntity,
    err: {
      code: errors.invalidData,
      message: errors.idAndQuantity,
    }
  };
}

// async function validateSaleProduct(id) {
//   const result = await findProductByIdFromDB(id);
//   console.log(result);

//   if (result === null) throw {
//     status: unprocessableEntity,
//     err: {
//       code: errors.invalidData,
//       message: errors.idAndQuantity,
//     }
//   };
// }

module.exports = {
  validateNameLength,
  validateProductExists,
  validateQuantity,
  validateSaleQuantity,
};
