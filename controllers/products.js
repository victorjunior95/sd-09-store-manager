const { productsService } = require('../services');

const HTTP_201_CREATED = 201;

module.exports = {
  async create(req, res, next) {
    try {
      const { name, quantity } = req.body;
      const response = await productsService.create({ name, quantity });

      res.status(HTTP_201_CREATED).json(response);
    } catch (err) {
      next(err);
    }
  }
};
