const service = require('../services/productsService');

const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_INVALID_DATA,
} = require('../httpResponse');


const postNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await service.postNewProduct({ name, quantity });

  res.status(HTTP_CREATED_STATUS).send(newProduct);
};

const getProducts = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const data = await service.allProducts();

    return res.status(HTTP_OK_STATUS).send(data);
  }

  const data = await service.productById(id);

  res.status(HTTP_OK_STATUS).send(data);
};

module.exports = {
  getProducts,
  postNewProduct,
};