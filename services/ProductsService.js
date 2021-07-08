const productsModel = require('../models/ProductsModel');

const HTTP_NOTPROCESS_STATUS = 422;
const HTTP_CREATED_STATUS = 201;
const productMaxLength = 5;
const productMinQuantity = 0;

const create = async (name, quantity) => {
  if (name.length < productMaxLength)
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: {
        message: '"name" length must be at least 5 characters long',
        code: 'invalid_data',
      },
    };

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

  if (quantity < productMinQuantity)
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: {
        message: '"quantity" must be larger than or equal to 1',
        code: 'invalid_data',
      },
    };

  if (quantity === productMinQuantity)
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

  const product = await productsModel.create(name, quantity);

  return { product, status: HTTP_CREATED_STATUS };
};

module.exports = {
  create,
};
