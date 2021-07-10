const throwWrongIdFormat = () => {
  throw {
    customError: {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    },
  };
};

module.exports = throwWrongIdFormat;
