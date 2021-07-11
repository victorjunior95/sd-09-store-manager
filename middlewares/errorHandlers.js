const httpStatusCode = require('../utils/httpStatusCodes');

const errorHandler = (err, _req, res, next) => {

  if (err.isJoi) {
    return res.status(httpStatusCode.invalid_data).json({ 
      err: { 
        code: 'invalid_data', 
        message: err.message, 
      }
    });
  }

  if (err.customError) {
    const { err: { code } } = err.customError;
    return res.status(httpStatusCode[code]).json(err.customError);
  }

  next(err);
};

const serverErrorHandler = (err, _req, res, _next) => {
  console.log(err);

  return res.status(httpStatusCode.internal_server_error).json({ 
    err: { 
      code: 'internal_server_error', 
      message: 'Oooops D:', 
    }
  });
};

module.exports = { errorHandler, serverErrorHandler };
