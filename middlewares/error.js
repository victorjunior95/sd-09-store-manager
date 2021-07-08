module.exports = (err, _req, res, _next) => {
  const erro = {
    err: {
      code: err.code,
      message: err.error.message
    }
  };

  res.status(err.status).json(erro);
};