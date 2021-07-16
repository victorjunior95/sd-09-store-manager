const ProductsService = require('../services/ProductsService');

const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
} = require('../httpResponse');

const deleteProduct = async (req, res, _next) => {
  const { id } = req.params;
  const deletecProduct = await ProductsService.deleteProduct(id);

  if (deletecProduct) return res.status(HTTP_OK_STATUS).send(deletecProduct);

};

const updateProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductsService.updateProduct({id, name, quantity});

  if (product) {
    return res.status(HTTP_OK_STATUS).send({ name, quantity, id });
  }
};

const getProducts = async (req, res, _next) => {
  const { id } = req.params;

  if (!id) {
    const data = await ProductsService.getAllProducts();

    return res.status(HTTP_OK_STATUS).send(data);
  }

  const data = await ProductsService.getProductById(id);

  res.status(HTTP_OK_STATUS).send(data);
};


const addProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.addProduct({name, quantity});

  return res.status(HTTP_CREATED_STATUS).send(product);
};



module.exports = {
  deleteProduct,
  updateProduct,
  getProducts,
  addProduct
};

