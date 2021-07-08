const getAll = (_req, res, next) => {
  res.status(200).json({ 'test': true });
  next();
};

const putProduct = (req, res, _next) => {
  const { name, quantity } = req.body;
  res.status(200).json({ 'name': name, 'quantity': quantity });
};

module.exports = {
  getAll,
  putProduct,
  deleteProduct,
  postProduct
};