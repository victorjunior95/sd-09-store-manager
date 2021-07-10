const productsServices = require('../../services/productsServices');
const unprocessableEntity = 422;
const okay = 200;
const created = 201;

const insertProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsServices.insertProduct(name, quantity);
  if (product.err) {
    return res.status(unprocessableEntity).json(product);
  }
  return res.status(created).json(product);
};

module.exports = {
  insertProduct
};
