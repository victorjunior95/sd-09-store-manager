const productModel = require('./Models/functions');

const updateQuantityProduct = (quantitySales) => {
  quantitySales.forEach(async ({productId, quantity}) => {
    await productModel.somaProducts(productId, quantity);
  });
};

const subQuantityProduct = (quantitySales) => {
  quantitySales.forEach(async ({productId, quantity}) => {
    await productModel.subProducts(productId, quantity);
  });
};

module.exports = {
  updateQuantityProduct,
  subQuantityProduct,
};