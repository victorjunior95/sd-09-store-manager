const deleteDBProduct = require('../../../../services/products/deleteProduct');
const { STATUS_OK } = require('../../../../utils/constants');

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const response = await deleteDBProduct(id);

  if(response.code) next(response);

  else res.status(STATUS_OK).json(response);
};

module.exports = deleteProduct;