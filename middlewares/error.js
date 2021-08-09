const unprocessableEntity = 422;
const notFound = 404;

module.exports = (err, _req, res, _next) => {
  if (err === 'Sale not found') {
    return res.status(notFound).json({ 
      err: {
        code: 'not_found',
        message: err,
      }
    });
  }

  if (err === 'Such amount is not permitted to sell') {
    return res.status(notFound).json({ 
      err: {
        code: 'stock_problem',
        message: err,
      }
    });
  }

  if (err) {
    return res.status(unprocessableEntity).json({ 
      err: {
        code: 'invalid_data',
        message: err,
      }
    });
  }
};
