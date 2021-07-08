const { UNPROCESSABLE_ENTITY, NOT_FOUND } = require('../httpCodes');

const errorMiddleware = async (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  if (err.code === 'invalid_data') {
    return res.status(UNPROCESSABLE_ENTITY).json({ err });
  }

  if (err.code === 'not_found') {
    return res.status(NOT_FOUND).json({ err });
  }

  return res
    .status(UNPROCESSABLE_ENTITY)
    .json({ err: { code: 'error_default', message: 'deu ruim' } });
};

module.exports = errorMiddleware;
