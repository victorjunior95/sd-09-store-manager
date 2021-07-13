const STATUS_ERR = 422;
module.exports = (err, _req, res, _next) => {
  console.log(err);
  res.status(STATUS_ERR).json({ err: { code: err.code, message: err.message } });

};
