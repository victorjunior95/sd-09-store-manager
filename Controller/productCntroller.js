const productServeci = require('../Service/productService');
const rescue = require('express-rescue');
const stt = {
  d1: 201,
  d: 200,
};

const create = rescue(
  async (req, res) => {
    const { name, quantity } = req.body;
    const retorneCreate = await productServeci.create(name, quantity);

    return res.status(stt.d1).json(retorneCreate);
  }
);

const FindAll = async (_req, res) => {
  const retorneCreate = await productServeci.FindAll();

  return res.status(stt.d).json({ 'products': retorneCreate } );
};

const FindId = rescue(
  async (req, res) => {
    const { id } = req.params;
    const retorneCreate = await productServeci.FindId(id);

    return res.status(stt.d).json(retorneCreate);
  }
);


module.exports = {
  create,
  FindAll,
  FindId,
};
