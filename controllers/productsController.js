const createProductsService = require('../services/productsServices');

const OK = 201;
const INVALID_DATA = 422;

const createProductsController = async (req, res) => {
  const result = await createProductsService(req.body);

  if (result.err) return res.status(INVALID_DATA).json(result);
  
  res.status(OK).json(result);
};

module.exports = createProductsController;
