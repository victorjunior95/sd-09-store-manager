const SaleService = require('../Service/SaleService');

const { StatusCodes } = require('http-status-codes');

const getAllSales = async (_req, res) => {
  console.log('[SALES CONTROLLER] : CHAMOU O MÉTODO BUSCAR AS SALES');
  try {
    const result = await SaleService.getAllSales();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[SALES CONTROLLER]: BUSCAR => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getOneSale = async (req, res) => {
  console.log('[SALES CONTROLLER] : CHAMOU O MÉTODO BUSCAR UM SALE');
  try {
    const { id } = req.params;
    const result = await SaleService.getOneSale(id);
    console.log(result);
    if (result.isError) return res.status(StatusCodes.NOT_FOUND).json(result);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[SALES CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const editSale = async (req, res) => {
  console.log('[SALES CONTROLLER] : CHAMOU O MÉTODO EDITAR UM SALE');
  try {
    const { id } = req.params;
    const  itemSold  = req.body;
    const updateSale = await SaleService.updateSale(id,itemSold);
    if (updateSale.isError) return res.status(updateSale.status).json(updateSale);
    return res.status(StatusCodes.OK).json(updateSale);
  } catch (error) {
    console.log(`[SALES CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
const createSale = async (req, res) => {
  console.log('[SALES CONTROLLER] : CHAMOU O MÉTODO ADICIONAR UM SALE');
  try {
    const product = req.body;
    const result = await SaleService.createSale(product);

    if (result.isError) return res.status(result.status).json(result);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[SALES CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  console.log('[SALES CONTROLLER] : CHAMOU O MÉTODO DELETAR UM SALE');

  try {
    const { id } = req.params;
    const product = await SaleService.deleteSale(id);
    if (product.isError) return res.status(product.status).json(product);
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.log(`[SALES CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  getAllSales,
  getOneSale,
  createSale,
  editSale,
  deleteSale,
};
