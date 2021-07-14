const errorMessages = {
  nameLength: '"name" length must be at least 5 characters long',
  productExists: 'Product already exists',
  quantityNumber: '"quantity" must be larger than or equal to 1',
  quantityString: '"quantity" must be a number', 
  invalidId: 'Wrong id format',
  invalidSaleId: 'Wrong sale ID format',
  wrongSale: 'Wrong product ID or invalid quantity',
  notFoundSale: 'Sale not found',
  saleQuantity: 'Such amount is not permitted to sell',
};

module.exports = errorMessages;
