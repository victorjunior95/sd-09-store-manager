const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (data) => {
  const { ops } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }));

  return ops[0];
};

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return { sales };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

  return sale
    ? sale
    : null;
};

const updateById = async (id, { productId, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const updatedSale = await connection()
    .then(
      (db) => db.collection('sales')
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              'itensSold.$[element].quantity': quantity,
            }
          },
          { arrayFilters: [{ 'element.productId': productId }] },
        )
    );

  const newSaleValue = await findById(id);

  return updatedSale
    ? newSaleValue
    : null;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const { deletedCount } = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return { deletedCount };
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
