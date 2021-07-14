const getDBProducts = require('../../models/products/getProducts');

const getProducts = async () => {
  const products = await getDBProducts();
  return { products };
};

module.exports = getProducts;