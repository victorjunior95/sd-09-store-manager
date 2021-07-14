const {
  allProductsService,
  findProduct,
  updateProduct
} = require('./getProductsService');
const {
  productFormatValidator,
  registerProduct,
} = require('./productFormatValidator');

module.exports = {
  allProductsService,
  findProduct,
  updateProduct,
  productFormatValidator,
  registerProduct,
};
