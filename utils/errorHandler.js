const httpCodes = require('./httpCodes.json');
const errorCodes = require('./errorCodes.json');
const ajvError = require('ajv').ValidationError;

const isValidationError = (err) => err instanceof ajvError;

const responseValidationError = (errorObj) => ({
  err: {
    code: errorCodes.INVALID_DATA,
    message: errorObj.errors[0].message,
  },
});

const errorHandler = (errorObj, res) => {
  if (isValidationError(errorObj) && res) {
    res
      .status(httpCodes.HTTP_UNPROCESSABLE_ERROR)
      .json(responseValidationError(errorObj));
  }
  if(res === undefined) console.error('Error uncaught: ', errorObj);
};

module.exports = errorHandler;
