const ServiceProducts = require('../services/ServiceProducts');

const CREATED = 201;
const SUCCESS = 200;

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const createProduct = await ServiceProducts.create({ name, quantity });
  
    return res.status(CREATED).json(createProduct);
  } catch(error) {
    next(error);
  }
};

const getAllOrById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findAllOrById = await ServiceProducts.getAllOrById(id);

    res.status(SUCCESS).json(findAllOrById);
  } catch(error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
  
    const editedProduct = await ServiceProducts.editProduct(id, { name, quantity });
  
    return res.status(SUCCESS).json(editedProduct);
  } catch(error) {
    next(error);
  }

};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ServiceProducts.getAllOrById(id);
  
    const deletedProduct = await ServiceProducts.deleteProduct(id);
  
    return res.status(SUCCESS).json(deletedProduct);
  } catch(error) {
    next(error);
  }
};

module.exports = {
  create,
  getAllOrById,
  editProduct,
  deleteProduct,
};
