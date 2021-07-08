const {
  addProductToDB,
  getAll,
  findProductById,
  updateProduct,
  deleteProduct,
} = require('../services/productsService');

const { created, ok } = require('../services/httpStatusCode');

async function postProductToDB(req, res, next) {
  try {
    const { name, quantity } = req.body;
    const result = await addProductToDB(name, quantity);
    res.status(created).json(result);
  } catch (error) {
    next(error);
  }
}

async function getAllProducts(_req, res, next) {
  try {
    const result = await getAll();
    res.status(ok).json({ products: result });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await findProductById(id);
    res.status(ok).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateProductById(req, res, next) {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await updateProduct(id, name, quantity);
    res.status(ok).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteProductById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);
    res.status(ok).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postProductToDB,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
