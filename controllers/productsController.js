const productsServices = require('../services/products/productsServices');

const createProducts= async (req, res) => {
  const { name, quantity } = req.body;
  const createResult = await productsServices.create(name, quantity);

  if (createResult.message) {
    return res.status(createResult.status).json({message: createResult.message});
  }
  return res.status(createResult.status).json(createResult.newProduct);
};

const findAll = async (req, res) => {
  const result = await productsServices.findAll();
  return res.status(200).json(result);
};

module.exports = {
  createProducts,
  findAll,
};
