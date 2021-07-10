const ServiceSales = require('../services/ServiceSales');

const SUCCESS = 200;

const create = async (req, res, next) => {
  try {
    const itensSold = req.body;

    const createSale = await ServiceSales.create(itensSold);
  
    res.status(SUCCESS).json(createSale);
  } catch(error) {
    next(error);
  }
};

const getAllOrById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findAllOrById = await ServiceSales.getAllOrById(id);

    res.status(SUCCESS).json(findAllOrById);
  } catch (error) {

    next(error);
  }
};

const editSale = async (req, res, next) => {
  try {
    const itensSold = req.body;
    const { id } = req.params;
  
    const editedSale = await ServiceSales.editSale(id, itensSold);
  
    return res.status(SUCCESS).json(editedSale);
  } catch (error) {

    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedSale = await ServiceSales.deleteSale(id);

    return res.status(SUCCESS).json(deletedSale);
  } catch (error) {

    next(error);
  }
};

module.exports = {
  create,
  getAllOrById,
  editSale,
  deleteSale,
};
