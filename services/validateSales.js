const quantity = (products) => {
  const minQuantity = 0;
  products.forEach(({ quantity }) => {
    if (quantity < minQuantity
        || quantity === minQuantity
        || typeof quantity === 'string') {
      throw {
        status: 422,
        err: { 
          code: 'invalid_data', 
          message: 'Wrong product ID or invalid quantity',
        }
      };
    }
  });
};

const byId = (result) => {
  if (!result) {
    throw {
      status: 404,
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }
};

const excludeId = (result) => {
  if (!result) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    };
  }
};

module.exports = {
  quantity,
  byId,
  excludeId,
};
