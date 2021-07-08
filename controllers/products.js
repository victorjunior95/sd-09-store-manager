const { productsService } = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const { name = '', quantity = '' } = req.body;
      const response = await productsService.create({ name, quantity });

      res.status(200).json(response);
    } catch (err) {
      const body = {
        code: err.code, message: err.message,
      };
      res.status(422).json({ err: body });
    }
  }
};
