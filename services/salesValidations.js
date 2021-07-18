const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const validNumber = (newSale) => {
  newSale.forEach((sale) => {
    if (typeof sale.quantity !== 'number') throw {
      status: UNPROCESSABLE_ENTITY_STATUS,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      } };
  });
};

const validQuantity = (newSales) => {
  newSales.forEach((sale) => {
    if (sale.quantity < 1) throw {
      status: UNPROCESSABLE_ENTITY_STATUS,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      } };
  });
};

const validSearch = (search) => {
  if (!search) throw {
    status: NOT_FOUND,
    err: {
      code: 'not_found',
      message: 'Sale not found'
    } };
};

module.exports = {
  validNumber,
  validQuantity,
  validSearch,
};
