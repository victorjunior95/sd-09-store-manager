const connection = require('./connection');

const listAll = async () => {
  const all = await connection().then((db) => db.collection('products').findOne());
  return all;
};

module.exports = {
  listAll,
};
