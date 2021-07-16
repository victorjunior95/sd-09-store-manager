const { checkIfSalesExist } = require('../models/SalesModel');
const { HTTP_INVALID_DATA } = require('../httpResponse');

const salesNotExistError = async (req, res, next) => {
  const { id } = req.params;

  const exist = await checkIfSalesExist(id);

  if (!exist) return res.status(HTTP_INVALID_DATA).send({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    },
  });

  return next();
};

module.exports = salesNotExistError;
