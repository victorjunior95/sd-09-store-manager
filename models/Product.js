const { ObjectID } = require('mongodb');
const connection = require('./connection');

const err = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  }
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));
  if (!product) return null;

  return product;
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((res) => {
      return res.map(({ _id, name, quantity }) => {
        return {
          _id,
          name,
          quantity,
        };
      });
    });
};


const findById = async (id) => {
  if (!ObjectID.isValid(id)) return err;
  const productData = await connection()
    .then((db) => db.collection('products').findOne(ObjectID(id)));
  if (!productData) return (err);

  const { name, quantity } = productData;

  return { _id: id, name, quantity };
};

const create = async (name, quantity) => await connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const update = async (id, name, quantity) => {
  if (!ObjectID.isValid(id)) return null;
  
  return await connection()
    .then((db) => db.collection('products')
      .update({ _id: new ObjectID(id) }, { name, quantity }))
    .then(() => ({ _id: id, name, quantity }));
};

const remove = async (id) => {
  if (!ObjectID.isValid(id)) return err;

  const removeProduct = await findById(id);
  
  if (!removeProduct) return removeProduct;

  return await connection()
    .then((db) => db.collection('products').deleteOne({ _id: new ObjectID(id) }))
    .then(() => removeProduct);
};
  

module.exports = {
  create,
  findByName,
  findById,
  getAll,
  update,
  remove,
};