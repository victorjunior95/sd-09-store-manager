const productsService = require('../services/products.service');

const createProduct = async (req, res) => {
  try {
    const { body } = req;
    const { data, status } = await productsService.createProduct(body);
    
    return res.status(status).json(data);
  }
  catch({ status, data }) { return res.status(status).json(data); }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, status } = await productsService.getProductById(id);

    return res.status(status).json(data);
  }
  catch({ status, data }) { return res.status(status).json(data); }
};

const getProductsList = async (req, res) => {
  try {
    const { data, status } = await productsService.getProductList();

    return res.status(status).json(data);
  }
  catch({ status, data }) { return res.status(status).json(data); }
};

module.exports = {
  createProduct,
  getProductById,
  getProductsList,

};
