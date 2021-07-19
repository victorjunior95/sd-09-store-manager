const Products = require('../model/Products');

const createNewProduct = async (name, quantity) => {
	 const newProduct = await Products.createNewProduct(name, quantity);
  return {
    status: 201,
    newProduct
  };
};

module.exports = {
  createNewProduct,
};