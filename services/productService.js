const { createProduct } = require('../models/products');

const productCreate = async (name, quantity) =>{
  const data = await createProduct(name, quantity).then(result => result);
  return data;
};

module.exports = {
  productCreate,
};
