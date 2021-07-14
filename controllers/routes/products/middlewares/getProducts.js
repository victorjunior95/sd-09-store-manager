const getProducts = require('../../../../services/products/getProducts');
const { STATUS_OK } = require('../../../../utils/constants');

const getProductsArray = async (_req, res, next) => {
  const response = await getProducts();

  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = getProductsArray;