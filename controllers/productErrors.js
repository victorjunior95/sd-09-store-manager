const STATUS_422 = 422;

const error = (err, _req, res, _next) => {
  res.status(STATUS_422).json({err});
};

module.exports = error;
