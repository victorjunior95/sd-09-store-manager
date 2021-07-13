const ERR_STATUS = 500;

const messageError = (status, code, message) => 
  ({ status, code, message });

const sendErrorMessage = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({
      err: {
        code: err.code,
        message: err.message
      }
    });
  }
  return res.status(ERR_STATUS).json(err);
};

module.exports = {
  messageError,
  sendErrorMessage,
};
