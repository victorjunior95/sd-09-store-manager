const findSale = require('../../../../services/sales/findSale');
const { STATUS_OK } = require('../../../../utils/constants');

const getSale = async (req, res, next) => {
  const { id } = req.params;

  const response = await findSale(id);

  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = getSale;