const productsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

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

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();

  return result;
};

const getProductById = async (id) => {
  const result = await productsModel.getProductById(id);
  
  if(!result) return ({
    err: {
      code: 'not_found',
      message: 'Product not found'
    },
  });

  return result;
};

const updateProduct = async ({ id, name, quantity }) => {
  const result = await productsModel.updateProduct({ id, name, quantity });

  return result;
};

const deleteProduct = async (id) => {
  const result = await productsModel.deleteProduct(id);

  if (!result) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    },
  });

  return result;
};

const checkStock = async (saleArray) => {
  for ( const item of saleArray ) {
    const product = await productsModel.getProductById(ObjectId(item.productId));
    if (!product) return { err: { 
      code: 'invalid_data',
      message: 'Não existe produto com o Id fornecido'
    }};
    if (product.quantity < item.quantity) return { err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    }};
  };
  return {};
};

module.exports = {
  postNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  checkStock,
};
