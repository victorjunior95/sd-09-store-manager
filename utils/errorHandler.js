const httpCodes = require('./httpCodes.json');
const errorCodes = require('./errorCodes.json');
const ajvError = require('ajv').ValidationError;

const isValidationError = (err) => err instanceof ajvError;

const responseValidationError = (errorObj) => ({
  err: {
    code: errorObj.code || errorCodes.INVALID_DATA,
    message: errorObj.errors[0].message || errorObj[0].message,
  },
});

const responseAppError = (errorObj) => ({
  err: {
    code: errorObj.code || errorCodes.INVALID_DATA,
    message: errorObj.message,
  },
});

const errorHandler = (errorObj, res) => {
  console.log(errorObj);
  if(res === undefined) {
    console.error('Error uncaught: ', errorObj);
    return;
  }
  if (isValidationError(errorObj)) {
    res
      .status(httpCodes.HTTP_UNPROCESSABLE_ERROR)
      .json(responseValidationError(errorObj));
  } else {
    res
      .status(httpCodes.HTTP_UNPROCESSABLE_ERROR)
      .json(responseAppError(errorObj));
  }
};

module.exports = errorHandler;
