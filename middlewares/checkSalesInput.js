const { ObjectId } = require('mongodb');
const { HTTP_INVALID_DATA } = require('../httpResponse');

const checkSalesInput = (req, res, next) => {
  const { quantity, id } = req.body;
  const minQuantity = 1;

  if (!id) next();

  if (quantity < minQuantity || isNaN(quantity) || !ObjectId.isValid(id) ) {
    return res.status(HTTP_INVALID_DATA).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    });
  }
  
  next();
};

module.exports = checkSalesInput;