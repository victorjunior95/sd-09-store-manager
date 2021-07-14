const createSale = require('../../../../services/sales/createSale');
const { STATUS_OK } = require('../../../../utils/constants');

const postSale = async (req, res, next) => {
  const sales = req.body;
  const response = await createSale(sales);

  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = postSale;