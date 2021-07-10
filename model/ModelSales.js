const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { getById: getByIdProduct } = require('./ModelProducts');

const create = async (itensSold) => {
  const connect = await connection();
  
  await itensSold.forEach(async (item) => {
    const stockItens = await getByIdProduct(item.productId);
    if (stockItens.quantity < item.quantity) {
      return {
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      };
    }
  });

  const createItensSold = await connect.collection('sales')
    .insertOne({ 'itensSold': [...itensSold] });
  
  return {
    _id: createItensSold.insertedId,
    itensSold: createItensSold.ops[0].itensSold,
  };
};

const getAll = async () => {
  const connect = await connection();
  const findAll = await connect.collection('sales').find().toArray();

  return {
    sales: [...findAll],
  };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const findSale = await connect.collection('sales').findOne({ _id: ObjectId(id) });

  return findSale;
};

const editSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const editedSale = await connect.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

  if (editedSale.modifiedCount < 1) {
    return false;
  }

  return {
    _id: id,
    itensSold,
  };
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const deletedSale = await connect.collection('sales')
    .findOneAndDelete({ _id: ObjectId(id) });

  return deletedSale.value;
};

module.exports = {
  create,
  getAll,
  getById,
  editSale,
  deleteSale,
};
