const {
  allProductsService,
  findProduct,
} = require('./getProductsService');
const {
  productFormatValidator,
  registerProduct,
} = require('./productFormatValidator');

module.exports = {
  allProductsService,
  findProduct,
  productFormatValidator,
  registerProduct,
};
