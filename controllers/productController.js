const productsService = require('../services/productsService');

const add = async (req, res, next) => {
  const { name, quantity } = req.body;
  const successCode = 201;
  const message = 'Product already exists';
  const code = 'invalid_data';
  const errType = 422;

  const insertedProduct = await productsService.add(name, quantity);

  if (!insertedProduct) return next({
    err: {
      message,
      code,
      data: { errType }
    }
  });

  return res.status(successCode).json(insertedProduct);
};

module.exports = {
  add,
};
