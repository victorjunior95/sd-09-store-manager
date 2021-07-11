const connections = require('./connections');
const { ObjectId } = require('mongodb');

const create = async(sales) => {
  const newSales = await connections()
    .then((db) => db.collection('sales')
      .insertOne({ sales }))
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

const updateSales = async (productId, quantity) => {
  if (!ObjectId.isValid(productId)) return null;
  const editedSales = connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ productId: ObjectId(productId) }, { $set: { quantity } })
      .then(() => ({ _productId: productId, quantity}))
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