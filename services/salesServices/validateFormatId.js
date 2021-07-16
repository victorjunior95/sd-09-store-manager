const validateFormatId = (id) => {
  if (id === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    };
  }
};

module.exports = {
  validateFormatId
};
