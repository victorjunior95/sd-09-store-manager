const validate = require('../utils/validator');

const product = (req, _res, next) => validate.product(req.body)
  .then(() => next())
  .catch((err) => next({ status: 422, err }));

const productExists = async (req, _res, next) => validate.productExists(req.body)
  .then(() => next())
  .catch((err) => next({ status: 422, err }));

const productId = (req, _res, next) => validate.productId(req.params.id)
  .then(() => next())
  .catch((err) => next({ status: 422, err }));

module.exports = { product, productExists, productId };