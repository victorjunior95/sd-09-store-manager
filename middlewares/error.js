module.exports = (err, _req, res, _next) => {
  const UNPROCESSABLE = 422;
  const INTERNAL_SERVER_ERROR = 500;
  const NOT_FOUND = 404;
  if (err.isJoi) {
    return res.status(UNPROCESSABLE)
      .json({ err: {code: 'invalid_data', message: err.details[0].message } });
  }

  const statusByErrorCode = {
    invalid_data: UNPROCESSABLE,
    not_found: NOT_FOUND,
    stock_problem: NOT_FOUND,
  };

  const status = statusByErrorCode[err.code] || INTERNAL_SERVER_ERROR;

  res.status(status).json({ err: { code: err.code, message: err.message } });
};
