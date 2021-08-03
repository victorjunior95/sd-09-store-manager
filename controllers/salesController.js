const Service = require('../services');

// const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_STATUS = 422;

const addSales = async (req, res) => {
  const product = await Service.sales.addSales(req.body);

  if (product.err) return res.status(HTTP_UNPROCESSABLE_STATUS).json(product);

  res.status(HTTP_CREATED_STATUS).json(product);
};

module.exports = {
  addSales,
};
