const updateSale = require('../../../../services/sales/updateSale');
const { STATUS_OK } = require('../../../../utils/constants');

const putSale = async (req, res, next) => {
  const { id } = req.params;
  const sales = req.body;

  const response = await updateSale(id, sales);

  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = putSale;