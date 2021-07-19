function responseHelperMiddleware(_req, res, next) {
  const httpCodes = {
    invalidData: 422,
    created: 201,
    ok: 200,
    notFound: 404,
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
  res.notFound = (message, code) => res.status(httpCodes.notFound).json({
    err: {
      code: code || 'not_found',
      message: message,
    }
  });
  return next();
}

module.exports = responseHelperMiddleware;
