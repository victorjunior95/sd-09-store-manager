function erroProduct(err, _req, res, _next) {
  const { status, code, message } = err;

  return res.status(status).json({err: { code, message } });
}

module.exports = erroProduct;