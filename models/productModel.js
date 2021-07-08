const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  return product;
};

const create = async ({ name, quantity }) => {
  const product = await findByName(name);

  if (product) return null;

  const { ops } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return ops[0];
};

const getAll = () => (
  connection().then((db) => db.collection('products').find().toArray())
);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

  return product;
};

const updateById = async (id, { name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const newProduct = await connection()
    .then(
      (db) => {
        const newData = { name, quantity };

        return db.collection('products')
          .updateOne({ _id: ObjectId(id) }, { $set: newData });
      }
    );

  if (!newProduct) return null;

  console.log(newProduct);

  return {
    _id: id,
    name,
    quantity
  };
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const { deletedCount } = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return { deletedCount };
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
