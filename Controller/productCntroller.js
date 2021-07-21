const productServeci = require('../Service/productService');
const rescue = require('express-rescue');
const status = 201;

const create = rescue(
  async (req, res) => {
    const { name, quantity } = req.body;
    const retorneCreate = await productServeci.create(name, quantity);

    return res.status(status).json(retorneCreate);

  }
);

module.exports = {
  create,
};
