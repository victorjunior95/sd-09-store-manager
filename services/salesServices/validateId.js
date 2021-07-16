const validateFoundId = async (id) => {
  if (id === null) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  };
};

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
  validateFoundId,
  validateFormatId
};
