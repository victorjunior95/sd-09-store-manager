const Products = require('../services/Product');

const duzentos = 200;
const duzentosEUm = 201;

const getAll = async (_req, res) => {
  const products = { products: await Products.getAll() };
  
  res.status(duzentos).json(products);
};

// Referências: Luíse Rios, no Slack.
// https://app.slack.com/client/TMDDFEPFU/search/search-fbf40972-822f-4e65-874a-de9b6ee06e04/thread/C017W4EDD4K-1618436566.104800

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const products = await Products.create(name, quantity);

  if (products.error) return next(products);

  res.status(duzentosEUm).json(products);
};


const findById = async(req,res,next) => {
  const { id } = req.params;

  const products = await Products.findById(id);

  if(products.error) return next(products);

  res.status(duzentos).json(products);
};

const update = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const products = await Products.update(id, name, quantity);

  if (products.error) return next(products);

  res.status(duzentos).json(products);
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;

  const products = await Products.deleteOne(id);

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