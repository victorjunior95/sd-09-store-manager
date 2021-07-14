const listSales = require('../../../../services/sales/listSales');
const { STATUS_OK } = require('../../../../utils/constants');

const getSales = async (_req, res, next) => {
  const response = await listSales();

  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = getSales;