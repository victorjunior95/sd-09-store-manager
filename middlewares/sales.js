const minimalQuantity = 0,
  STATUS_422 = 422;


const validationSalesQuantity = (req, res, next) => {
  const MIN_SIZE = 1;
  const sales = req.body;
  const FOR = 0;
  for (let i = FOR; i < sales.length; i += 1) {
    if (sales[i].quantity < MIN_SIZE || typeof(sales[i].quantity) !== 'number') {
      return res.status(STATUS_422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  }
  return next();
};


module.exports = {
  
  validationSalesQuantity
};
