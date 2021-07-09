const { 
  registerProduct,
  findProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
} = require('../models/productsModel');

const register = async (name, quantity) => {
  const newProduct = await registerProduct(name, quantity);
  return newProduct;
};

const findByName = async (name) => {
  const product = await findProductByName(name);
  if(product) {
    throw [
      {err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }},
      {
        status: 422
      }
    ];
  }
  return product;
};

const checksLengthName = (name) => {
  const minimumLengthName = 5;
  if(name.length < minimumLengthName) {
    throw [
      { err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }},
      {
        status: 422
      }
    ];
  }
};

const checkQuantity = (quantity) => {
  const minumumQuantity = 0;
  if(quantity <= minumumQuantity) {
    throw [
      {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      },
      {
        status: 422
      },
    ];
  }
};

const checkIfQuantityIsANumber = (quantity) => {
  if(typeof quantity !== 'number') {
    throw [
      {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number'
        }
      },
      {
        status: 422
      }
    ];
  }
};

const getProducts = async () => {
  const allProducts = await getAllProducts();
  return allProducts;
};

const getSingleProduct = async (id) => {
  const product = await getProductById(id);
  return product;
};

const checkIfProductExists = (product) => {
  if(!product) {
    throw [
      {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      },
      {
        status: 422
      }
    ];
  }
};

const checkId = (id) => {
  const regexId = /[0-9A-Fa-f]{6}/g;
  const bolean = regexId.test(id);
  if(!bolean) {
    throw [
      {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      },
      {
        status: 422
      }
    ];
  }
};

const update = async (id, name, quantity) => {
  const updatedProduct = await updateProduct(id, name, quantity);
  checksLengthName(name);
  checkQuantity(quantity);
  checkIfQuantityIsANumber(quantity);
  return updatedProduct;
};


module.exports = {
  register,
  findByName,
  checksLengthName,
  checkQuantity,
  checkIfQuantityIsANumber,
  getProducts,
  getSingleProduct,
  checkIfProductExists,
  checkId,
  update
};
