const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const errorMiddlewares = (err, _req, res, _next) => {
  console.log(err);

  if (err.status) {
    const { status, message, code } = err;
    return res.status(status).json({err: { message, code }});
  }
  // if (err.isJoi) {
  //   return res.status(UNPROCESSABLE_ENTITY).json({
  //     err: {
  //       code: 'invalid_data',
  //       message: err.details[0].message
  //     }
  //   });
  // }

  // if (err.code === 'invalid_data') {
  //   return res.status(err.status).json({ err });
  // }

  // if (err.code === 'not_found') {
  //   return res.status(NOT_FOUND).json({ err });
  // }

  return res.status(INTERNAL_SERVER_ERROR).json({
    code: 'internal',
    message: 'Internal server error',
  });
};

module.exports = errorMiddlewares;
