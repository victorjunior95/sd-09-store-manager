const { ObjectId } = require('mongodb');

const validateName = (name, products) => {
  const minNameLength = 5;
  const alreadyExists = products.some((curr) => name === curr.name);

  if (alreadyExists)throw {
    err:
    {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  };

  if (!name || name.length < minNameLength) throw {
    err:
    {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }
  };
  return null;
};

const validateQuantity = (quantity) => {
  const zero = 0;

  if (!quantity || quantity === zero || quantity < 1) throw {
    err:
    {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    }
  };

  if (typeof quantity !== 'number') throw {
    err:
    {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    }
  };
};

const validateId = (id) => {
  const isValid = ObjectId.isValid(id);
  if (!isValid) throw {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  };
  return null;
};

module.exports = {
  validateName,
  validateQuantity,
  validateId,
};
