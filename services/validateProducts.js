const products = require('../models/productsModule');

const name = async (name) => {
  const minNameLength = 5;
  if (name.length < minNameLength) {
    throw {
      status: 422,
      err: { 
        code: 'invalid_data', 
        message: '"name" length must be at least 5 characters long',
      }
    };
  };

  const result = await products.findByName(name);
  if (result) {
    throw {
      status: 422,
      err: { 
        code: 'invalid_data', 
        message: 'Product already exists',
      }
    };
  }
};

const quantity = (quantity) => {
  const minQuantity = 0;
  if (quantity < minQuantity || quantity === minQuantity) {
    throw {
      status: 422,
      err: { 
        code: 'invalid_data', 
        message: '"quantity" must be larger than or equal to 1',
      }
    };
  }

  if (typeof quantity === 'string') {
    throw {
      status: 422,
      err: { 
        code: 'invalid_data', 
        message: '"quantity" must be a number',
      }
    };
  }
};

const id = (result) => {
  if (!result) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  }
};

module.exports = {
  name,
  quantity,
  id,
};
