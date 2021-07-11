const throwSaleNotFound = () => {
  throw {
    customError: {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    },
  };
};

module.exports = throwSaleNotFound;
