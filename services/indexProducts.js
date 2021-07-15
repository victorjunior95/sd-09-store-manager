const {
  allProductsService,
  findProduct,
  updateProduct,
  deleteProduct,
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
  deleteProduct,
};
