module.exports = (err, _req, res, _next) => {
  const ERROR_CODE = 422;

  if (err.isJoi) {
    return (
      res
        .status(ERROR_CODE)
        .json({
          err: {
            code: 'invalid_data',
            message: err.details[0].message,
          },
        })
    );
  }

  res.status(err.code).json(err);
};
