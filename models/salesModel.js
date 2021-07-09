const { ObjectId } = require('mongodb');
const connection = require('./connection');

const sales = 'sales';

const add = async (itensSold) => {
  const db = await connection();
  const response = await db.collection(sales).insertOne({ itensSold });

  return response.ops[0];
};


// select
const getAll = async () => {
  try {
    const response = (await (await connection()).collection(sales).find().toArray());
    return response;
  } catch (error) {
    return error;
  }
};

// getById
const getById = async (id) => {
  try {
    console.log(id);
    const db = await connection();
    const sale = (await db.collection(sales)
      .find({ _id: ObjectId(id) }).toArray());
    console.log(sale);
    return sale[0];
  } catch (error) {
    return error;
  }
};

// update
const update = async (id, itensSold) => {
  const response = await(await connection())
    .collection(sales).updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold }},
    );

  const newProduct = { _id: id, itensSold };

  if (response.result.nModified) {
    // colocar uma messagem
  }
  return newProduct;
};

module.exports = {
  add,
  getAll,
  getById,
  update,
};
