const { INTERNAL_SERVER_ERROR, INVALID_DATA } = require('../utils/httpStatusCodes');

const errorHandler = (err, _req, res, next) => {

  if (err.isJoi) {
    return res.status(INVALID_DATA).json({ 
      err: { 
        code: 'invalid_data', 
        message: err.message, 
      }
    });
  }

  if (err.customError) {
    return res.status(INVALID_DATA).json(err.customError);
  }

  next(err);
};

const serverErrorHandler = (err, _req, res, _next) => {
  console.log(err);

  return res.status(INTERNAL_SERVER_ERROR).json({ 
    err: { 
      code: 'internal_server_error', 
      message: 'Oooops D:', 
    }
  });
};

module.exports = { errorHandler, serverErrorHandler };
