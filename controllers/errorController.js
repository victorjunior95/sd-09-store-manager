module.exports = (error, _req, res, _next) => {
  const INTERNAL_ERROR = 500;

  if (error.status) {
    return res.status(error.status).json({
      err: { code: error.code, message: error.message },
    });
  }
  return res.status(INTERNAL_ERROR).json(error);
};
