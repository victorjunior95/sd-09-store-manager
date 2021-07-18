function responseHelperMiddleware(_req, res, next) {
  const httpCodes = {
    invalidData: 422,
    created: 201,
  };
  res.invalidData = (message) =>
    res.status(httpCodes.invalidData).json({
      err: {
        code: 'invalid_data',
        message: message,
      },
    });
  res.created = (json) => res.status(httpCodes.created).json(json);
  return next();
}

module.exports = responseHelperMiddleware;
