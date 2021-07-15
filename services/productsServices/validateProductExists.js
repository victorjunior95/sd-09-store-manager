const validateProductExists = async (productById) => {
  if (productById === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }
};

module.exports = validateProductExists;
