module.exports = (err, _req, res, _next) => {
  // if (err.isJoi) {
  //   return resizeBy.status(422)
  //     .json({ error: { message: err.details[0].message } });
  // }

  res.status(422).json({ err: { code: err.code, message: err.message } });
};
