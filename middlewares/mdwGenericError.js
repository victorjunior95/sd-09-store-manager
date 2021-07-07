const errorMiddleware = (error, _req, res, _next) => {
  const genericNumberError = 500;
  const { err } = error;
  const { status } = err;
  const statusCode = status || genericNumberError;
  delete error.err.status;
  res.status(statusCode).json(error);
};

module.exports = { errorMiddleware };
