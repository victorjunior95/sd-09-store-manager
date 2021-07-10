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

const findAll = async (_req, res) => {
  const code = 200;

  const result = await productsServices.findAll();

  return res.status(code).json({ products: result });
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const code = 200;

  const result = await productsServices.findById(id);

  if (result.message) {
    const { status, code, message } = result;
    return res.status(status).json({
      err: {
        code: code,
        message: message,
      },
    });
  }

  return res.status(code).json(result);
};

module.exports = {
  createProducts,
  findAll,
  findOne,
};
