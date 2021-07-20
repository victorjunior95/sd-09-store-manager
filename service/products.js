const productModel = require('../models/product');

const create = 201;
const sucess = 200;
const notProduct = 422;

const isValidName = (name) => {
  const tamanhoName = 5;
  if(!name || typeof name !== 'string' || name.length < tamanhoName) return false;
  return true;
};

const existName = async (name) => {
  if(await productModel.nameProduct(name)) {
    throw {
      status: notProduct,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  };
};
  
const isValidQuantitPositivo = (quantity) => {
  if(parseInt(quantity) < 1 ) {
    throw {
      status: notProduct,
      result: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      },
    };
  };
};
  
const isvalidQuantityIsNumber = (quantity) => {
  if(!quantity || typeof quantity !== 'number') {
    throw {
      status: notProduct,
      result: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
      },
    };
  };
};

const existId = async(_id) => {
  const findId = await productModel.productsId(_id);
  if(!findId) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    };
  };
};

const addProduct = async (name, quantity) => {
  if(!isValidName(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long',
      }
    };
  }
  const product = await productModel.createProduct(name, quantity);
  return { status: create, product };
};

// const getProduct = async () => {
//   const products = await productModel.getProducts();
//  return { status: sucess, products};
// };

// const productId = async (_id) => {
//  const findId = await productModel.productsId(_id);
//  existId(findId);
//  return { status: sucess, findId};
// };

module.exports = { addProduct, 
  //getProduct, 
  //productId
};
