const { ObjectId } = require('mongodb');

const validateSaleId = (req, res, next) => {
  const { id } = req.params;
  if(!id) return next();

  const ID_LENGTH = 24;

  if (!ObjectId.isValid(id) || id.length !== ID_LENGTH) {
    const err = {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    };
    return next (err);
  }

  return next();
};

module.exports = validateSaleId;
