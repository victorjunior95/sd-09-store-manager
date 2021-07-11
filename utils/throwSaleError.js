const throwSaleError = () => {
  throw {
    customError: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    },
  };
};

module.exports = throwSaleError;