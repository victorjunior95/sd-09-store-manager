const errorCode = require('../utils/errorCode');

const errorMiddleware = (err, _req, res, _next) => {
  res.status(errorCode[err.code]).json({ err });
};

module.exports = errorMiddleware;
