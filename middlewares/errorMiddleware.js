const httpCodes = require('../auxiliarFunctions/httpCodes');

const errorMiddleware = (err, req, res, next) => {

  if (err.isJoi) {
    return res.status(httpCodes.invalidData)
      .json({ err: {
        code: 'invalid_data',
        message: err.details[0].message.replace(/greater/, 'larger'),
      } });
  }

  if(err.code === 'invalid_data') return res.status(httpCodes.invalidData).json({err});

  res.status(httpCodes.internalServerError)
    .json({ error: { code: 'internal', message: 'Internal server error' } });
};

module.exports = errorMiddleware;
