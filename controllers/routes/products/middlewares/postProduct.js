const createProduct = require('../../../../services/products/createProduct');
const { STATUS_CREATED } = require('../../../../utils/constants');

const postProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const response = await createProduct({ name, quantity });

  if(response.code) next(response);

  else res.status(STATUS_CREATED).json(response);
};

module.exports = postProduct;
