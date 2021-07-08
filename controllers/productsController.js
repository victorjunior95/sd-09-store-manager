const {
  createProductService,
  getProductsAllService,
  getProductByIdService,
  updateProductByIdService,
} = require('../services/productsServices');

const OK = 200;
const CREATED = 201;
const INVALID_DATA = 422;

const createProductController = async (req, res) => {
  const result = await createProductService(req.body);

  if (result.err) return res.status(INVALID_DATA).json(result);
  
  res.status(CREATED).json(result);
};

const getProductsAllController = async (_req, res) => {
  const result = await getProductsAllService();

  res.status(OK).json(result);
};

const getProductByIdController = async (req, res ) => {
  const productId = req.params.id;
  const result = await getProductByIdService(productId);

  if (result.err) return res.status(INVALID_DATA).json(result);

  res.status(OK).json(result);
};

const updateProductByIdController = async (req, res) => {
  const productId = req.params.id;
  const data = req.body;
  const result = await updateProductByIdService(productId, data);

  if (result.err) return res.status(INVALID_DATA).json(result);

  res.status(OK).json(result);
};

module.exports = {
  createProductController,
  getProductsAllController,
  getProductByIdController,
  updateProductByIdController,
};
