const connections = require('./connections');
const { ObjectId } = require('mongodb');

const create = async(itemSold) => {
  const newSales = await connections()
    .then((db) => db.collection('sales')
      .insertMany([{ itensSold: [...itemSold ] }]))
    .then((result) => result.ops[0]);

  return newSales;
};

const listAllSalesModel = async () => {
  const listSale = await connections()
    .then((db) => db
      .collection('sales')
      .find()
      .toArray());

  return listSale;
};

const saleAllModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleId = await connections()
    .then((db) => db
      .collection('sales')
      .findOne( new ObjectId(id)));

  return saleId;
};

const updateSales = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const editedSales = await connections().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } })
      .then(() => ({ _id: id, productId, quantity}))
  );

  return editedSales;
};

const excludeSaleModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connections()
    .then((db) =>
      ObjectId.isValid(id)
        ? db.collection('sales')
          .deleteOne({ _id: ObjectId(id) })
        : null);
};

module.exports = {
  create,
  listAllSalesModel,
  saleAllModel,
  updateSales,
  excludeSaleModel
};