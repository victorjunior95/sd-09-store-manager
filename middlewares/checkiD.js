const { ObjectId } = require('mongodb');
const { HTTP_INVALID_DATA } = require('../httpResponse');

const checkiD = (req, res, next) => {
  const { id } = req.params;

  if (!id) return next();

  if (!ObjectId.isValid(id)) {
    return res.status(HTTP_INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
    });
  }

  return next();
};

module.exports = checkiD;