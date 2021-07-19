const UNPROCESSABLE_ENTITY = 422;
const error = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      code: 'invalid data',
      message: err.details[0].message });
  }
  return res.status(UNPROCESSABLE_ENTITY).json(err);
};

module.exports = error;
