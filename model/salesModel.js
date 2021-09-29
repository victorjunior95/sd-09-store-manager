const { ObjectId } = require('mongodb');
const connect = require('./connection');

const register = async (itensSold) => {
  const connection = await connect();
  const newSale = await connection.collection('sales')
    .insertOne({ itensSold });

  return newSale.ops[0];
};

const list = async (_id) => {
  const connection = await connect();
  if (_id) {
    try {
      const find = await connection.collection('sales').findOne({
        _id: ObjectId(_id)
      });

      return find;
    } catch {
      return;
    }
  }

  const salesList = await connection.collection('sales').find().toArray();
  return salesList;
};

const update = async (_id, itensSold) => {
  const connection = await connect();
  const updateSale = await connection.collection('sales').updateOne(
    {
      _id: ObjectId(_id)
    },
    {
      $set: { itensSold }
    }
  );

  return updateSale;
};

const remove = async (_id) => {
  try {
    const connection = await connect();

    const checkedSale = await connection.collection('sales')
      .findOne({ _id: ObjectId(_id) });
    if (!checkedSale) return;

    const deleteOne = await connection.collection('sales')
      .deleteOne({ _id: ObjectId(_id) });
    if (deleteOne.deletedCount !== 1) return;

    return checkedSale;
  } catch {
    return;
  }
};

module.exports = {
  register,
  list,
  update,
  remove
};
