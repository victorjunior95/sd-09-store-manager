const findProduct = require('../../../../services/products/findProduct');
const { STATUS_OK } = require('../../../../utils/constants');

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  const response = await findProduct(id);

  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = getProduct;