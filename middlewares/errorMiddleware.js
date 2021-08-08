const errorHandler = require('../utils/errorHandler');
const ajvError = require('ajv').ValidationError;

module.exports = errorMiddleware = (err, _req, res, _next) => {
  errorHandler(err, res);
};

process.on('unhandledRejection', (reason) => {
  console.error('There was an unhandled rejection', reason);
  errorHandler(error);
});

process.on('uncaughtException', (error) => {
  console.error('There was an uncaught error', error);
  errorHandler(error);
});
