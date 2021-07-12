const throwWrongSaleIdFormat = () => {
  throw {
    customError: {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    },
  };
};

module.exports = throwWrongSaleIdFormat;
