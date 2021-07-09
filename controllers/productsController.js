const {
  createService,
  getAllService,
  getByIdService,
  updateService,
} = require('../services/productsService');

// response status code
const OK = 200;
const CREATED = 201;
//const UNPROCESSABLE = 422;

const getAll = async (_req, res) => {
  const products = await getAllService();

  res.status(OK).json({ products });
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await createService(name, quantity);

  if (product.isError) return res.status(product.status).json(product);

  res.status(CREATED).json(product);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await getByIdService(id);

  if (product.isError) return res.status(product.status).json(product);

  res.status(OK).json(product);
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const product = await updateService(id, name, quantity);

  if (product.isError) return res.status(product.status).json(product);

  res.status(OK).json(product);
};

module.exports = {
  getAll,
  create,
  getById,
  update,
};