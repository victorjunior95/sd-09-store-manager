const { createProduct } = require('../models/products');

const productCreate = async (name, quantity) =>{
  await createProduct(name, quantity).then(result => result);
  console.log('productCreate ok')
}

module.exports = {
  productCreate,
};
