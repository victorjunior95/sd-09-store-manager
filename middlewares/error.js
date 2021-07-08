const STATUS_ERR = 422;
module.exports = (err, _req, res, _next) => {
  // if (err.isJoi) {
  //   return resizeBy.status(422)
  //     .json({ error: { message: err.details[0].message } });
  // }

  res.status(STATUS_ERR).json({ err: { code: err.code, message: err.message } });
};
