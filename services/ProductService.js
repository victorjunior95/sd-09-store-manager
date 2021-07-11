const ProductModel = require('../models/ProductModel');

const nameLength = 5;

const minQuantity = 0;

const verifyNameLength = (name) => {
  if (name.length < nameLength ) {
    throw { 
      status: 422,
      error: {
        err: { 
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long', 
        } 
      }
    };
  }
};

const verifyIfProductNotExist = async (name) => {
  const product = await ProductModel.findByName(name);
  if (product) {
    throw { 
      status: 422,
      error: {
        err: { 
          code: 'invalid_data',
          message: 'Product already exists', 
        } 
      }
    };
  }
};

const verifyQuantity = (quantity) => {
  if (quantity <= minQuantity) {
    throw {
      status: 422,
      error: {
        err: {
          code: 'invalid_data' ,
          message: '"quantity" must be larger than or equal to 1'
        }
      }
    };
  }

  if (typeof quantity === 'string') {
    throw {
      status: 422,
      error: {
        err: {
          code: 'invalid_data' ,
          message: '"quantity" must be a number'
        }
      }
    };
  }
};

const verifyById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw {
      status: 422,
      error: {
        err: {
          code: 'invalid_data' ,
          message: 'Wrong id format'
        }
      }
    };
  }
};

const createProduct = async (name, quantity) => {
  verifyNameLength(name);
  await verifyIfProductNotExist(name);
  verifyQuantity(quantity);
  const newProduct = await ProductModel.createProduct(name, quantity);
  return newProduct;
};

const findAllProducts = async () => {
  const allProducts = await ProductModel.findAllProducts();
  return allProducts;
};

const findById = async (id) => {
  await verifyById(id);
  const product = await ProductModel.findById(id);
  return product; 
};

const updateProduct = async (id, name, quantity) => {
  await verifyById(id);
  verifyNameLength(name);
  verifyQuantity(quantity);
  await ProductModel.updateProduct(id, name, quantity);
  const newProduct = await findById(id);
  return newProduct;
};

const deleteProduct = async (id) => {
  await verifyById(id);
  const deleted = await ProductModel.deleteProduct(id);
  return deleted;
};

module.exports = {
  createProduct,
  findAllProducts,
  findById,
  updateProduct,
  deleteProduct,
};