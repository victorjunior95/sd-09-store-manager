function responseHelperMiddleware(_req, res, next) {
  const httpCodes = {
    invalidData: 422,
    created: 201,
    ok: 200,
  };
  res.invalidData = (message) =>
    res.status(httpCodes.invalidData).json({
      err: {
        code: 'invalid_data',
        message: message,
      },
    });
  res.created = (json) => res.status(httpCodes.created).json(json);
  res.ok = (json) => res.status(httpCodes.ok).json(json);

  return next();
}

module.exports = responseHelperMiddleware;
