const { getProductsByIds } = require('../services/productService');

const UNPROCESSABLE_ENTITY_STATUS = 422;

const idValidationInArray = async (req, res, next) => {
  const array = req.body;
  const productIds = array.map((id) => id.productId);
  const uniqueProductIds = productIds
    .filter((id, index, arr) => index === arr.indexOf(id));

  const products = await getProductsByIds(uniqueProductIds);

  if (uniqueProductIds.length !== products.length) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
};

module.exports = idValidationInArray;

// referência para remover elementos duplicados de um array
// usada para atribuir o valor à constante uniqueProductIds
// https://net2.com/how-to-remove-duplicates-from-arrays-in-javascript/
