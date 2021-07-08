const { addProductToDB } = require('../services/productsService');

const HTTP_STATUS_CREATED = 201;

async function postProductToDB(req, res, next) {
  try {
    const { name, quantity } = req.body;
    const result = await addProductToDB(name, quantity);
    console.log(result);
    res.status(HTTP_STATUS_CREATED).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postProductToDB,
};
