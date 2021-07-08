const errorMiddleware = require('./errorMiddleware');
const validateProductInput = require('./validateProductInput');
const validateId = require('./validateId');
const validateSalesInput = require('./validateSalesInput');

module.exports = {
  errorMiddleware,
  validateProductInput,
  validateId,
  validateSalesInput,
};

