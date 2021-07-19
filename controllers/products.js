const products = require('../services/products');

const STATUS_200 = 200;
const STATUS_422 = 422;

const getAllProducts = async (_req, res) => {
  const prod = await products.getAllProducts();

  res.status(STATUS_200).json(prod);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const prod = await products.getProductById(id);

  if (prod !== null) {
    return res.status(STATUS_200).send(prod);

  } else {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

module.exports = { getAllProducts, getProductById };
