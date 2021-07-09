module.exports = (err, _req, res, _next) => {
  const STATUS_500 = 500;

  const error = {
    err: {
      code: err.err.code,
      message: err.err.message
    }
  };

  const statusByErrorCode = {
    invalid_data: 422,
    not_found: 404,
  };

  const status = statusByErrorCode[err.err.code] || STATUS_500;

  res.status(status).json(error);
}; 