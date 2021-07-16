const { HTTP_NOT_FOUND_STATUS } = require('../httpResponse');
const { checkIfSalesExist } = require('../models/SalesModel');

const checkForSalesId = async (req, res, next) => {
  const { id } = req.body;

  const exist = await checkIfSalesExist({ id });

  if (!exist) return res.status(HTTP_NOT_FOUND_STATUS).send({
    err: {
      code: 'not_found',
      message: 'Sale not found'
    },
  });

  return next();
};

module.exports = checkForSalesId;
