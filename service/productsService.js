const Products = require('../model/productsModel');

const MIN_CHARACTERS = 5;
const MIN_QUANTITY = 1;

const INVALID_NAME = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: `"name" length must be at least ${MIN_CHARACTERS} characters long`
    }
  }
};

const INVALID_QUANTITY_TYPE = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  }
};

const INVALID_QUANTITY = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: `"quantity" must be larger than or equal to ${MIN_QUANTITY}`
    }
  }
};

const ALREADY_EXIST = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  }
};

const PRODUCTS_NOT_FOUND = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  }
};

const validateBody = (name, quantity) => {
  // console.log(name, quantity);
  if (name.length < MIN_CHARACTERS) return INVALID_NAME;
  if (typeof quantity !== 'number') return INVALID_QUANTITY_TYPE;
  if (quantity < MIN_QUANTITY) return INVALID_QUANTITY;

  return null;
};

const register = async (name, quantity) => {
  const bodyValidated = validateBody(name, quantity);
  if (bodyValidated) return bodyValidated;

  const productAlreadyExist = await Products.findByName(name);
  if (productAlreadyExist) return ALREADY_EXIST;

  const newProduct = await Products.register(name, quantity);
  return { status: 201, response: newProduct };
};

const list = async (id) => {
  const products = await Products.list(id);
  if (!products) return PRODUCTS_NOT_FOUND;

  if (id) return { status: 200, response: products };

  return { status: 200, response: { products } };
};

const update = async (id, name, quantity) => {
  const bodyValidated = validateBody(name, quantity);
  if (bodyValidated) return bodyValidated;

  await Products.update(id, name, quantity);

  return { status: 200, response: { _id: id, name, quantity } };
};

const remove = async (id) => {
  const deleted = await Products.remove(id);
  if (!deleted) return PRODUCTS_NOT_FOUND;

  return { status: 200, response: { deleted }};
};

module.exports = {
  register,
  list,
  update,
  remove
};
