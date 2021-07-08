const products = require('../models/products');

const validate = ({ name, quantity }) => {
  const minLength = 5;
  if (name.length < minLength) return {
    err: '"name" length must be at least 5 characters long' };
  if (typeof(quantity) !== 'number') return { err: '"quantity" must be a number'};
  if (quantity < 1) return { err: '"quantity" must be larger than or equal to 1'};
  return null;
};

const create = async ({ name, quantity }) => {
  if (validate({ name, quantity })) return validate({ name, quantity });
  const exists = await products.getAll().then((res) => res.some((p) => p.name === name));
  if (exists) return { err:  'Product already exists'};
  const res = await products.create({ name, quantity });
  return res;
};

const getAll = async () => products.getAll().then((res) => ({ 'products': res }));

const getById = async ({ id }) => products.getById({ id })
  .then((res) => res || { err: 'Wrong id format' });

const update = async ({ id, name, quantity }) => validate({ name, quantity })
  ? validate({ name, quantity })
  : products.update({ id, name, quantity });

const remove = async ({ id }) => products.remove({ id })
  .then((res) => res || { err: 'Wrong id format' });

module.exports = { create, getAll, getById, update, remove };
