const removeSale = require('../../../../services/sales/removeSale');
const { STATUS_OK } = require('../../../../utils/constants');

const deleteSale = async (req, res, next) => {
  const { id } = req.params;

  const response = await removeSale(id);


  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = deleteSale;