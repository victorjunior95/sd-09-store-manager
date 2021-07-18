const products = [];

async function save({ name, quantity }) {
  const id = '123';
  const product = {
    _id: id,
    name,
    quantity,
  };
  products.push(product);
  return product;
}

async function findByName(name) {
  return products.find((product) => product.name === name);
}

module.exports = {
  save,
  findByName,
};
