module.exports = (err, req, res, next) => {
  const { status, code, message } = err;
  return res.status(status).json({ 'err': { code, message } });
};