const productServeci = require('../Service/productService');
const rescue = require('express-rescue');
const stt = 201;

const create = rescue(
  async (req, res) => {
    const { name, quantity } = req.body;
    const retorneCreate = await productServeci.create(name, quantity);

    return res.status(stt).json(retorneCreate);

  }
);

module.exports = {
  create,
};
