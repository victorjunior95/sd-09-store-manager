const invalidProduct = (status, code, message) => ({
  status,
  code,
  message,    
});

const alreadyExists = () => ({
  status: 422,
  code: 'invalid_data',
  message: 'Product already exists',
});

module.exports = {
  invalidProduct,
  alreadyExists
};
