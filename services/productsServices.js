const productsModel = require('../models/productsModel');

const postNewProduct = async ({name, quantity}) => {
  const product = await productsModel.postNewProduct({ name, quantity });

  if(!product) return ({
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    },
  });

  return product;
};

module.exports = {
  postNewProduct,
};
