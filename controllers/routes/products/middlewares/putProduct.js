const updateProduct = require('../../../../services/products/updateProduct');
const { STATUS_OK } = require('../../../../utils/constants');

const putProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const response = await updateProduct(id, { name, quantity });

  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = putProduct;