const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => {
  const product = await ProductsModel.getAllProducts();

  return product;
};

const findById = async (id) => {
  const product = await ProductsModel.findById(id);

  return product;
};

const createProduct = async (name, quantity) => {
  const product = await ProductsModel.findByName(name);

  if (product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  const { insertedId } = await ProductsModel.createProduct(name, quantity);

  return {
    _id: insertedId,
    name,
    quantity
  };
};

const editProduct = async (id, name, quantity) => {
  const newProduct = await ProductsModel.editProduct(id, name, quantity);

  return newProduct;
};

const deleteProduct = async (id) => {
  const product = await ProductsModel.deleteProduct(id);

  return product;
};

const buyProduct = async (id, quantity) => {
  const product = await ProductsModel.buyProduct(id, quantity);

  return product;
};

const deleteSale = async (id, quantity) => {
  const product = await ProductsModel.deleteSale(id, quantity);

  return product;
};

module.exports = {
  createProduct,
  findById,
  getAllProducts,
  editProduct,
  deleteProduct,
  buyProduct,
  deleteSale
};
