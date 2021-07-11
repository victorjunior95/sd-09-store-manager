const errors = {
  invalidData: 'invalid_data',
  nameLength: '"name" length must be at least 5 characters long',
  quantityIsNumber: '"quantity" must be a number',
  quantityMinValue: '"quantity" must be larger than or equal to 1',
  idFormat: 'Wrong id format',
  idAndQuantity: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  notFound: 'not_found',
  idSaleFormat: 'Wrong sale ID format',
  stockProblem: 'stock_problem',
  quantityNotPermitted: 'Such amount is not permitted to sell',
};

module.exports = errors;
