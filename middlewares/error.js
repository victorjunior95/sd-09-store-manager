module.exports = (err, _req, res, _next) => {
  const UNPROCESSABLE = 422;
  const INTERNAL_SERVER_ERROR = 500;
  if (err.isJoi) {
    return res.status(UNPROCESSABLE).json({ error: { message: err.details[0].message } });
  }

  const statusByErrorCode = {
    invalid_data: UNPROCESSABLE,
  };

  const status = statusByErrorCode[err.code] || INTERNAL_SERVER_ERROR;

  res.status(status).json({ error: { message: err.message } });
};
