const { UNPROCESSED } = require('../constants/httpCodes.json');

module.exports = (err, _request, response, _next) => {
  if (err.err) {
    return response.status(UNPROCESSED)
      .json(err);
  }
};
