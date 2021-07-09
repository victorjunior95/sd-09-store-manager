const messageErrorsProducts = {
  nameRequired: {
    code: 'invalid_data',
    message: '"name" is required',
    status: 422,
  },
  nameInvalid: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
    status: 422,
  },
  nameRepeated: {
    code: 'invalid_data',
    message: 'Product already exists',
    status: 422,
  },
  quantityInvalid: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
    status: 422,
  },
  quantityEqualZero: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
    status: 422,
  },
  quantityNAN: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
    status: 422,
  },
  idFormatInvalid: {
    code: 'invalid_data',
    message: 'Wrong id format',
    status: 422,
  }
};

const messageErrorsSales = {
  quantityInvalid: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
    status: 422,
  },
  quantityNAN: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
    status: 422,
  },
  stockProblem: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
    status: 422,
  },
  saleNotFound: {
    code: 'not_found',
    message: 'Sale not found',
    status: 404,
  },
  idFormatInvalid: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
    status: 422,
  },
  stockInvalid: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

module.exports = {
  messageErrorsProducts,
  messageErrorsSales,
};
