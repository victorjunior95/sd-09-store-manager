const productsServices = require('../services/products/productsServices');

const createProducts= async (req, res) => {
  const { name, quantity } = req.body;
  const createResult = await productsServices.create(name, quantity);

  if (createResult.message) {
    const { status, code, message } = createResult;
    return res.status(status).json({
      err: {
        code: code,
        message: message,
      },
    });
  }

  return res.status(createResult.status).json(createResult.newProduct);
};

const findAll = async (req, res) => {
  const code = 200;
  const result = await productsServices.findAll();
  return res.status(code).json(result);
};

module.exports = {
  createProducts,
  findAll,
};
