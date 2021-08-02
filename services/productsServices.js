const productsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const MIN_CHARACTERS_NAME = 5;
const MIN_PRODUCT_AMOUNT = 0;

const chekName = (name) => {
  if (name.length < MIN_CHARACTERS_NAME) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    };
  }
};

const chekQuantity = (quantity) => {
  if(quantity <= MIN_PRODUCT_AMOUNT) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }
};

const existingProduct = async (name) => {
  const product = await productsModel.findByName(name);

  return product;
};

const createProduct = async (name, quantity) => {
  if (chekName(name)) return chekName(name);
  if (chekQuantity(quantity)) return chekQuantity(quantity);
  if (await existingProduct(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  };

  const newProduct = await productsModel.createProduct(name, quantity);
  return newProduct;
};

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  const allProducts = { products: [...products] };

  return allProducts;
};

const getProductId = async (id) => {
  const productId = await productsModel.getProductId(id);

  if (productId === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }

  return productId;
};

const productUpdate = async (id, name, quantity) => {
  if (chekName(name)) return chekName(name);
  if (chekQuantity(quantity)) return chekQuantity(quantity);

  await productsModel.productUpdate( id, name, quantity );

  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  const deleteProductId = await productsModel.deleteProduct(id);
  if (!deleteProductId) {
    
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }

  return deleteProductId;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductId,
  productUpdate,
  deleteProduct,
};
