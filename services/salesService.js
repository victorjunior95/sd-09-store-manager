const productsServices = require('../services/productsService');
const sales = require('../models/sales');

const operation = {
  CREATE_SALE: 'sale',
  UPDATE_SALE: 'update',
  DELETE_SALE: 'delete'
};

const getAll = async () => {
  const salesList = await sales.getAll();
  return { sales: salesList };
};

const findById = async (saleId) => {
  const sale = await sales.findById(saleId);
  return sale;
};

const validateItemSoldQuantity = async (item, operation, saleQuantityDiference) => {
  const itemInventory = await productsServices.findById(item.productId);
  if (
    (itemInventory.quantity < item.quantity && operation != 'update')
    ||
    itemInventory.quantity < saleQuantityDiference
  ) {
    return {err: 'error on first test to update quantity'};
  }
  switch (true) {
  case (operation === 'sale'):
    itemInventory.quantity -= item.quantity;
    break;
  case (operation === 'update'):
    itemInventory.quantity -= saleQuantityDiference;
  case (operation === 'delete'):
    itemInventory.quantity += item.quantity;
  default:
    break;
  }
  await productsServices.updateProduct(
    itemInventory._id, itemInventory.name, itemInventory.quantity);
};

const createSale = async (itensSold) => {
  itensSold.forEach((item) => {
    validateItemSoldQuantity(item, operation.CREATE_SALE);
  });
  const { insertedId } = await sales.create(itensSold);
  return { _id: insertedId, itensSold };
};

const updateSale = async (saleId, itemSold) => {
  const { itensSold } = await findById(saleId);
  itensSold.forEach((item) => {
    if (item.productId === itemSold.productId) {
      saleQuantityDiference = itemSold.quantity - item.quantity;
      validateItemSoldQuantity(
        item, operation.UPDATE_SALE, saleQuantityDiference);
      item.quantity = itemSold.quantity;
    }
  });
  const { modifiedCount } = await sales.update(saleId, itensSold);
  if(modifiedCount) {
    return { _id: saleId, itensSold };
  }
};

const deleteSale = async (id) => {
  const sale = await findById(id);
  sale.itensSold.forEach((item) => {
    validateItemSoldQuantity(
      item, operation.DELETE_SALE);
  });
  sales.remove(id);
  return sale;
};

module.exports = {
  getAll,
  findById,
  createSale,
  updateSale,
  deleteSale,
};
