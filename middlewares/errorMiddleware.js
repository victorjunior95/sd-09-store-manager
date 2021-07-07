const { httpStatusCode: { internalServerError } } = require('../utils');

function errorMiddleware(error, _req, res, _next) {
  console.log(error.message);
  if (error.status) return res.status(error.status).json({
    err: {
      code: error.code,
      message: error.message
    }
  });

  return res.status(internalServerError).json({ message: 'internal error' });
};

module.exports = errorMiddleware;
