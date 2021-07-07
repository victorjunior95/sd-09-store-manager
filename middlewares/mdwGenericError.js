const errorMiddleware = (err, _req, res, _next) => {
  const genericNumberError = 500;
  const { code } = err;
  const statusCode = code || genericNumberError;
  res.status(statusCode).json(err);
};

module.exports = { errorMiddleware };
