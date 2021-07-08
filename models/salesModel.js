const { ObjectId } = require('mongodb');
const connection = require('./connection');
const ProductModel = require('./productModel');

const updateProductQuantity = async (id, quantity, action) => {
  const product = await ProductModel.findById(id);
  let newQuantity;

  if (action === 'delete') {
    newQuantity = product.quantity + quantity;
  } else {
    newQuantity = product.quantity - quantity;
  }

  await ProductModel.updateById(id, { name: product.name, quantity: newQuantity });

};

const create = async (data) => {
  await data
    .forEach(
      ({productId, quantity}) => updateProductQuantity(productId, quantity, 'create')
    );

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

  await updateProductQuantity(productId, quantity, 'update');

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

  const { itensSold } = await findById(id);

  await itensSold
    .forEach(
      ({ productId, quantity }) => updateProductQuantity(productId, quantity, 'delete')
    );

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
