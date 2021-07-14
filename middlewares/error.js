const { UNPROCESSED, NOTFOUND } = require('../constants/httpCodes.json');

module.exports = (err, _request, response, _next) => {
  if (err.err) {
    if (err.err.code === 'not_found') return response.status(NOTFOUND).json(err);
    return response.status(UNPROCESSED)
      .json(err);
  }
};
