const productsService = require('../services/products.service');

const createProduct = async (req, res) => {
  try {
    const { body } = req;
    const { data, status } = await productsService.createProduct(body);
    
    return res.status(status).json(data);
  } catch(err) {
    console.log(err);
    return res.status(err.status).json({err: err.data});
  }

};

module.exports = {
  createProduct,
};
