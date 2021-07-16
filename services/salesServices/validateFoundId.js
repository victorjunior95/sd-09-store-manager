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

module.exports = {
  validateFoundId
};
