const HTTP_ERROR = 500;
const HTTP_UNPROCESSABLE = 422;

module.exports = (err, _req, res, _next) => {
  if (err.err.code === 'invalid_data') {
    return res.status(HTTP_UNPROCESSABLE).json(err);
  }
  return res.status(HTTP_ERROR).json({
    err: {
      code: 'internal_error',
      message: err.message,
    },
  });
};
