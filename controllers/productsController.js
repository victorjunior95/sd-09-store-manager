const Service = require('../services');

// const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_STATUS = 442;

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Service.products.addProduct({ name, quantity });

  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);

  res.status(HTTP_CREATED_STATUS).json(product);
};

module.exports = {
  addProduct,
};
