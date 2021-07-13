const modelProducts = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const findProduct = await modelProducts.findByName(name);

  if (findProduct) return {
    err: { 
      code: 'invalid_data',
      message: 'Product already exists'
    }
  };

  const product = await modelProducts.setNew(name, quantity);
  return product;
};

const getAllProducts = async () => {
  const findProducts = await modelProducts.getAll();

  return {
    'products': [...findProducts],
  };
};

const getProductById = async (id) => {
  const findProduct = await modelProducts.findById(id);

  return findProduct;
};

const deleteProductById = async (id) => await modelProducts.deleteById(id);

const updateProductById = async (id, name, quantity) => await modelProducts.updateById(
  id, name, quantity
);

module.exports = { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  deleteProductById, 
  updateProductById 
};
