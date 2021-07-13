const connection = require('../../connection/connection');

const getAll = async (collection) => {
  return await connection()
    .then((db) => db.collection(collection).find().toArray());
};

module.exports = { getAll };