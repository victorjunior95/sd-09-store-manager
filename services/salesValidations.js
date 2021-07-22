const NOT_FOUND_STATUS = 404;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const validNumber = (newSale) => {
  newSale.forEach((sale) => {
    if (typeof sale.quantity !== 'number' || sale.quantity === undefined) throw {
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
    status: NOT_FOUND_STATUS,
    err: {
      code: 'not_found',
      message: 'Sale not found'
    } };
};

const validId = (id) => {
  if (!id) throw {
    status: UNPROCESSABLE_ENTITY_STATUS,
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    } };
};

module.exports = {
  validId,
  validNumber,
  validQuantity,
  validSearch,
};
