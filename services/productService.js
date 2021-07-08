const ProductModel = require('../models/ProductModel');



const create = async (name, quantity) => {
  console.log('########### productService', name, quantity); // Passou aqui

  const newProduct = await ProductModel.create(name, quantity);
  console.log('newProduct', newProduct);
  return newProduct;
};


module.exports = {
  create,
};
