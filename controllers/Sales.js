const Sales = require('../services/Sales');

const duzentos = 200;

const getAll = async (_req, res) => {
  const products = await Sales.getAll();
  
  res.status(duzentos).json(products);
};

const create = async (req, res, next) => {
  const body = req.body;

  const products = await Sales.create(body);

  if (products.error) return next(products);

  res.status(duzentos).json(products);
};


const findById = async(req,res,next) => {
  const { id } = req.params;

  const products = await Sales.findById(id);

  if(products.error) return next(products);

  res.status(duzentos).json(products);
};

const update = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;

  const products = await Sales.update(id, body);

  if (products.error) return next(products);

  res.status(duzentos).json(products);
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;

  const products = await Sales.deleteOne(id);

  if (products.error) return next(products);

  res.status(duzentos).json(products);
};


module.exports = {
  getAll,
  create,
  findById,
  update,
  deleteOne
}; 