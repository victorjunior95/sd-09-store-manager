const Products = require('../models/Products');

const create = async (id) => {
  const product = await Products.findProductByName(id);
  console.log(product);
};

module.exports = {
  create,
};
