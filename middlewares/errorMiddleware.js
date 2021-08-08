const errorHandler = require('../utils/errorHandler');
const ajvError = require('ajv').ValidationError;

module.exports = errorMiddleware = (err, _req, res, _next) => {
  errorHandler(err, res);
};
