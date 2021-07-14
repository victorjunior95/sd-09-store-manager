const productModel = require('../models/productsModel');
const assistent = require('../assistent');

const createProduct = async (name, quantity) => {
  const product = await productModel.createProduct(name, quantity);
  
  if (assistent.verifyName(name)) return assistent.verifyName(name);
  
  if (await assistent.nameExists(name)) return await assistent.nameExists(name);
  
  if (assistent.verifyQuantity(quantity)) return assistent.verifyQuantity(quantity);

  return product;
};

const getAllService = async () => {
  const data = await productModel.allProducts();
  return data;
};

const findProductService = async (id) => {
  const data = await productModel.findProduct(id);
  if (!data) return { err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  }};
  return data;
};

const editProductService = async (id, name, quantity) => {
  const products = await productModel.editProduct(id, name, quantity);
  if (assistent.verifyName(name)) return assistent.verifyName(name);
  if (assistent.verifyQuantity(quantity)) return assistent.verifyQuantity(quantity);
  if (!products) return { err: 'Id inexistente'};
  return products;
};

const deleteProductService = async(id) => {
  const products = await productModel.deleteProduct(id);
  if (products === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  };
  return products;
};

module.exports = {
  createProduct,
  getAllService,
  findProductService,
  editProductService,
  deleteProductService,
};