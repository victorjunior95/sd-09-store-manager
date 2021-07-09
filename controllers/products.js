const { productsService } = require('../services');

const HTTP_201_CREATED = 201;
const HTTP_200_OK = 200;

module.exports = {
  async create(req, res, next) {
    try {
      const { name, quantity } = req.body;
      const response = await productsService.create({ name, quantity });

      res.status(HTTP_201_CREATED).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getAll(_req, res, next) {
    try {
      const response = await productsService.getAll();

      res.status(HTTP_200_OK).json(response);
    } catch (err) {
      next(err);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;
      const response = await productsService.get(id);

      res.status(HTTP_200_OK).json(response);
    } catch (err) {
      next(err);
    }
  },
};
