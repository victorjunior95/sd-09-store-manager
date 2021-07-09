const isValidNumber = (quantity) => {
  if (!quantity || !Number.isInteger(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return false;
};

const isPositiveNumber = (quantity) => {
  if (quantity <= Number('0')) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

module.exports = {
  isValidNumber,
  isPositiveNumber,
};