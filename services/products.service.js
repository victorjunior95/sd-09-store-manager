const productModel = require('../models/products.model');

const validateProduct = async ({ name, quantity }, method) => {
  const minQuantity = 1;
  const minNameLength = 5;
  let message;

  if (name.length < minNameLength) {
    message = '"name" length must be at least 5 characters long';
  }

  if (typeof(quantity) !== 'number') message = '"quantity" must be a number';

  if (quantity < minQuantity) {
    message = '"quantity" must be larger than or equal to 1';
  }

  const product = await productModel.findProductByName(name);
  if(method === 'post' && product) message = 'Product already exists';

  if (message) return { code: 'invalid_data', message };
};

const createProduct = async (newProduct) => {
  const validationError = await validateProduct(newProduct, 'post');
  
  if(validationError) throw { status: 422, data: { err: validationError } };

  const product = await productModel.addProduct(newProduct);

  return { status: 201, data: product };
};

const getProductList = async () => {
  const products = await productModel.listProducts();

  return { status: 200, data:{ products } };
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);

  if(!product) throw {
    status: 422,
    data: {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    }
  };

  return { status: 200, data: product };
};

const updateProductById = async (id, product) => {
  const validationError = await validateProduct(product, 'put');

  if(validationError) throw { status: 422, data: { err: validationError } };

  const updatedProduct = await productModel.updateProductById(id, product);

  return { status: 200, data: updatedProduct };
};

const deleteProductById = async (id) => {
  const deletedProduct = await productModel.deleteProductById(id);

  if(!deletedProduct) throw {
    status: 422,
    data: {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    }
  };

  return { status: 200, data: deletedProduct };
};

module.exports = {
  createProduct,
  getProductList,
  getProductById,
  updateProductById,
  deleteProductById,
};
