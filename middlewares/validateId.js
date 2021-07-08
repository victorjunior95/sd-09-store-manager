const { ObjectId } = require('mongodb');

const validateId = (req, res, next) => {
  const { id } = req.params;
  if(!id) return next();

  const ID_LENGTH = 24;

  if (!ObjectId.isValid(id) || id.length !== ID_LENGTH) {
    const err = {
      code: 'invalid_data',
      message: 'Wrong id format'
    };
    return next (err);
  }

  return next();
};

module.exports = validateId;
