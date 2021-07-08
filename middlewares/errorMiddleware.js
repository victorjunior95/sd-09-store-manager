const httpCodes = require('../auxiliarFunctions/httpCodes');

const errorMiddleware = (err, req, res, next) => {

  if (err.isJoi) {
    return res.status(httpCodes.invalid_data)
      .json({ err: {
        code: 'invalid_data',
        message: err.details[0].message,
      } });
  }
  if(err.code) return res.status(httpCodes[err.code]).json({err});

  
  res.status(httpCodes.internalServerError)
    .json({ error: { code: 'internal', message: 'Internal server error' } });
};

module.exports = errorMiddleware;
