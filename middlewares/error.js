module.exports = (err, req, res, _next) => {
  const STATUS_500 = 500;

  console.log(err.err);

  const error = {
    err: {
      code: err.err.code,
      message: err.err.message
    }
  };

  const statusByErrorCode = {
    invalid_data: 422,
  };

  const status = statusByErrorCode[err.err.code] || STATUS_500;

  res.status(status).json(error);
}; 