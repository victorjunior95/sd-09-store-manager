module.exports = (err, _req, res, _next) => {
  const UNPROCESSABLE = 422;
  const INTERNAL_SERVER_ERROR = 404;

  if (err.isJoi) {
    return res.status(UNPROCESSABLE)
      .json({ err: {code: 'invalid_data', message: err.details[0].message } });
  }

  const statusByErrorCode = {
    invalid_data: UNPROCESSABLE,
  };

  const status = statusByErrorCode[err.code] || INTERNAL_SERVER_ERROR;

  res.status(status).json({ err: { code: err.code, message: err.message } });

};
