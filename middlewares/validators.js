const validate = require('../services/validators');

const product = (req, _res, next) => validate.product(req.body)
  .then(() => next())
  .catch((err) => next(err));

const productExists = async (req, _res, next) => validate.productExists(req.body)
  .then(() => next())
  .catch((err) => next(err));

const productId = (req, _res, next) => validate.productId(req.params)
  .then(() => next())
  .catch((err) => next(err));

const sale = (req, _res, next) => validate.sale([...req.body])
  .then(() => next())
  .catch((err) => next(err));

const saleExists = (req, _res, next) => validate.saleExists(req.params)
  .then(() => next())
  .catch((err) => next(err));

const saleId = (req, _res, next) => validate.saleId(req.params)
  .then(() => next())
  .catch((err) => next(err));

const stock = async (req, _res, next) => validate.stock([...req.body])
  .then(() => next())
  .catch((err) => next(err));

module.exports = { product, productExists, productId, sale, saleExists, saleId, stock };
