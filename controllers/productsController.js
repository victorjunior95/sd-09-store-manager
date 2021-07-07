const createProductsService = require('../services/productsServices');

const OK = 201;

const createProductsController = async (req, res) => {
  const result = await createProductsService(req.body);

  if (result.err) return res.status(422).json(result);
  
  res.status(OK).json(result);
};

module.exports = createProductsController;
