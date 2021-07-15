const productModel = require('../model/productModel');
const util = require('../model/util');

const checkIfProductExists = async (name) => {
  if (await productModel.getProductByName(name)) return {
    err: { 
      message: 'Product already exists',
      code: 'invalid_data'
    } 
  };
  return null;
};

const validateProduct = async (name, quantity) => {
  const minNameLength = 5;
  const minQuantity = 0;

  if(name.length < minNameLength) return { 
    err: { 
      message: '"name" length must be at least 5 characters long',
      code: 'invalid_data'
    } 
  };

  if (quantity <= minQuantity) return {
    err: { 
      message: '"quantity" must be larger than or equal to 1',
      code: 'invalid_data'
    }
  };

  if (typeof quantity !== 'number') return {
    err: { 
      message: '"quantity" must be a number',
      code: 'invalid_data'
    }
  };

  return null;
};

const createNewProduct = async (name, quantity) => {
  return await productModel.createProduct(name, quantity);
};

const getAllProducts =  async () => {
  return await util.getAll('products');
};

const validateFoundId = async (id) => {
  const product = await productModel.findProductById(id);
  if (!product) return {
    err: { 
      message: 'Wrong id format',
      code: 'invalid_data'
    }
  };

  return product;
};

const update = async (id, name, quantity) => {
  return await productModel.updateProduct(id, name, quantity);
};

const deleteProductById = async (id) => {
  return await productModel.deleteOneProduct(id);
};

module.exports = {
  checkIfProductExists,
  validateProduct,
  createNewProduct,
  getAllProducts,
  validateFoundId,
  update,
  deleteProductById };
