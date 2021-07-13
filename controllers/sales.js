const { salesService } = require('../services');

const HTTP_200_OK = 200;

module.exports = {
  async create(req, res, next) {
    try {
      const payload = req.body;
      const response = await salesService.create(payload);

      res.status(HTTP_200_OK).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getAll(_req, res, next) {
    try {
      const response = await salesService.getAll();

      res.status(HTTP_200_OK).json(response);
    } catch (err) {
      next(err);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;
      const response = await salesService.get(id);

      res.status(HTTP_200_OK).json(response);
    } catch (err) {
      next(err);
    }
  },
};