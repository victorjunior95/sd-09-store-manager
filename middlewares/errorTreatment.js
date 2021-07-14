const errors = require('../errors');

const HTTP_500_INTERNAL_SERVER_ERROR = 500;
const HTTP_422_UNPROCESSED_ENTITY = 422;
const HTTP_404_NOT_FOUND = 404;

module.exports = (error, _req, res, _next) => {
  const body = { err: { code: error.code, message: error.message } };

  switch (error.constructor) {
  case errors.InvalidArgumentError:
    return res.status(HTTP_422_UNPROCESSED_ENTITY).json(body);
  case errors.OperationError:
  case errors.NotFoundError:
    return res.status(HTTP_404_NOT_FOUND).json(body);
  default:
    return res.status(HTTP_500_INTERNAL_SERVER_ERROR).json(body);
  }
};
