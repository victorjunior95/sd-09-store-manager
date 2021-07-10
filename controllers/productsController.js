const productsServices = require('../services/products/productsServices');

const code = 200;

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
  const result = await productsServices.findAll();

  return res.status(code).json({ products: result });
};

const findOne = async (req, res) => {
  const { id } = req.params;

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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  const result = await productsServices.update(id, updatedProduct);

  return res.status(code).json(result);
};

module.exports = {
  createProducts,
  findAll,
  findOne,
  updateProduct,
};
