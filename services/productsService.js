const productsModel = require('../models/productsModel');

const HTTP_NOTPROCESS_STATUS = 422;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;

const productMaxLength = 5;
const productMinQuantity = 0;
// testando alteração do nome
const ValidateCreateUpdate = (name, quantity) => {
  if (name.length < productMaxLength)
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: {
        message: '"name" length must be at least 5 characters long',
        code: 'invalid_data',
      },
    };

  if (quantity < productMinQuantity || quantity === productMinQuantity)
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: {
        message: '"quantity" must be larger than or equal to 1',
        code: 'invalid_data',
      },
    };

  if (typeof quantity !== 'number')
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: { message: '"quantity" must be a number', code: 'invalid_data' },
    };
};

const create = async (name, quantity) => {
  const existsError = ValidateCreateUpdate(name, quantity);
  if (existsError) {
    return existsError;
  }
  const existsName = await productsModel.findName(name);
  if (existsName) {
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: {
        message: 'Product already exists',
        code: 'invalid_data',
      },
    };
  }
  const product = await productsModel.create(name, quantity);
  return { product, status: HTTP_CREATED_STATUS };
};

const listAll = async () => {
  const products = await productsModel.listAll();
  return { products, status: HTTP_OK_STATUS };
};

const getProductById = async (id) => {
  const product = await productsModel.findProductById(id);
  if(!product) {
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }
  return { product, status: HTTP_OK_STATUS };
};

const update = async (id, name, quantity) => {

  const validateReturn = await ValidateCreateUpdate(name, quantity);
  if (validateReturn) {
    return validateReturn;
  }

  const productById = await getProductById(id);
  if (productById.err) {
    return productById;
  }
  
  const product = await productsModel.update(id, name, quantity);
  return { product, status: HTTP_OK_STATUS };
};

const exclude = async (id) => {
  const productNotExists = await getProductById(id);
  if (productNotExists.err) {
    return productNotExists;
  }

  const product = await productsModel.exclude(id);
 
  return { product, status: HTTP_OK_STATUS };
};

module.exports = {
  create,
  listAll,
  getProductById,
  update,
  exclude,
};
