const errorCodes = require('./errorCodes.json');

class AppError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code || errorCodes.INTERNAL_ERROR;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
