const { ObjectId } = require('mongodb');

function validateId(id) {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return {};
}

module.exports = { validateId, ObjectId};
