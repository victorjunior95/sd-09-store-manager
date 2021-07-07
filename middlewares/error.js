const error = (err, _req, res, _next) => {
  const errorCode = {
    invalid_data: 422,
  };

  const errorStatusService = 500;

  if (err.isJoi) {
    return res.status(errorCode['invalid_data'])
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  const status = errorCode[err.code] || errorStatusService;

  res.status(status).json({ err: { code: err.code, message: err.message } });
};

module.exports = error;