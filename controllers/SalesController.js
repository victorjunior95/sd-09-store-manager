const Sales = require('../services/SalesService');

// const STATUS_201 = 201;
const STATUS_200 = 200;

const addNewSale = async (req, res, next) => {
  const sales = await Sales.addNewSale(req.body);

  if (sales.err) return next(sales);

  const data = sales.map(({ productId, quantity }) => {
    return { productId, quantity };
  });

  const formatedSales = {
    _id: sales[0]._id,
    itensSold: data,
  };

  res.status(STATUS_200).json(formatedSales);
};

module.exports = {
  addNewSale,
};