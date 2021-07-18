const connection = require('./connection');

async function save(itens) {
  const salesCollection = await connection('sales');
  const { ops } = await salesCollection.insertOne({itensSold: itens});
  return ops[0];
}

module.exports = {
  save,
};
