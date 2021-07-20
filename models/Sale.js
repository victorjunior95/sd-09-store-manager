const connection = require('./connection');
const { ObjectId } = require('mongodb');

const formatSale = ({ itensSold, _id }) => {
  return {
    _id,
    itensSold
  };
};

const updateProductQuantityNewSale = async(itensSold) => {
  const LESS_ONE = -1;
  itensSold.forEach(async (item) => {
    const quantitySold = item.quantity * LESS_ONE;
    const _id = ObjectId(item.productId);
    const db = await connection();
    return await db.collection('products')
      .updateOne({_id}, {$inc: { quantity: quantitySold}}).then((aa) => console.log(aa)); 
  });
};

const updateProductQuantitySaleUpdate = async(id, itens) => {
  itens.forEach(async (item) => {
    const quantityUpdated = item.quantity;
    const sale = await findById(id);
    const oDeAgora = sale.itensSold
      .find((toUpdate) => toUpdate.productId == item.productId);
    const oldQuantity = oDeAgora.quantity;
    const newQuantity = oldQuantity - quantityUpdated;
    const _id = ObjectId(item.productId);
    const db = await connection();
    await db.collection('products')
      .updateOne({_id}, {$inc: { quantity: newQuantity}}); 
  });
};

const updateProductQuantitySaleDelete = async(deleted) => {
  deleted.itensSold.forEach(async (item) => {
    const oldQuantity = item.quantity;
    const _id = ObjectId(item.productId);
    const db = await connection();
    await db.collection('products')
      .updateOne({_id}, {$inc: { quantity: oldQuantity}}); 
  });
};

const create = async (soldProducts) => {
  const db = await connection();
  const createNew = await db.collection('sales').insertOne({itensSold: soldProducts}); 
  const result = await createNew.ops[0];
  const newSale =  formatSale(result);
  await updateProductQuantityNewSale(newSale.itensSold);
  return newSale;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const _id = ObjectId(id);
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({_id}));
  if (!sale) return null;
  return formatSale(sale);
};

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find());
  const result = await sales.toArray();
  return result.map(formatSale);
};

const edit = async (id, itens) => {
  const db = await connection();
  const _id = ObjectId(id);
  await updateProductQuantitySaleUpdate(id, itens);
  const edit = await db.collection('sales')
    .updateOne({_id}, {$set: {itensSold: itens}}); 
  const edited = await findById(id);
  const editedFormated = formatSale(edited);
  return editedFormated;
};

const deleteOne = async (id) => {
  const db = await connection();
  const _id = ObjectId(id);
  const deleted = await findById(id);
  const deleting = await db.collection('sales')
    .deleteOne({_id}); 
  const formatDelete = formatSale(deleted);
  await updateProductQuantitySaleDelete(formatDelete);
  return formatDelete;
};

module.exports = { create, findById, getAll, edit, deleteOne };
