const getProducts = require('../../models/products/getProducts');

const findProductName = async (name) => {
  const products = await getProducts();
  return products.find((product) => product.name === name);
};

module.exports = findProductName;
