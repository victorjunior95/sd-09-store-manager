const ProductsModel = require('../models/ProductsModel');

const buyProduct = async (id, quantity) => {
  const product = await ProductsModel.buyProduct(id, quantity);

  return product;
};

const deleteSale = async (id, quantity) => {
  const product = await ProductsModel.deleteSale(id, quantity);

  return product;
};

const deleteProduct = async (id) => {
  product = await ProductsModel.deleteProduct(id);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const product = await ProductsModel.updateProduct(id, name, quantity);

  return product;
};

const getAllProducts = async () => {
  const newProduct = await ProductsModel.getAllProducts();

  return newProduct;
};

const getProductById = async (id) => {
  const product = await ProductsModel.getProductById(id);

  return product;
};

const addProduct = async (name, quantity) => {
  const product = await ProductsModel.findProductByName(name);

  if (product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    };
  }

  const { insertedId } = await ProductsModel.addProduct(name, quantity);

  return {
    _id: insertedId,
    name,
    quantity
  };
};



module.exports = {
  buyProduct,
  deleteSale,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  addProduct,
};
