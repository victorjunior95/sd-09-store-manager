const productService = require('../service/products');

const createe = 201;
const sucess = 200;

const getAllProduct = async(_req, res) => {
  const products = await productService.getAllProduct();
  res.status(sucess).json({ products });
};

const create = async(req, res) => {
  const { name, quantity } = req.body;

  const cadastroProduto = await productService.createProduct(name, quantity);
  res.status(createe).json(cadastroProduto);
};

const findById = async(req, res) => {
  const { _id } = req.params;
  const findId = await productService.findById(_id);
  res.status(sucess).json(findId);
};

const editProduct = async(req, res) => {
  const { _id } = req.params;
  const { name, quantity } = req.body;
  const edit = await productService.editProduct(_id, name, quantity);
  res.status(sucess).json({_id, name, quantity});
};

const deleteProduct = async(req, res) => {
  const { _id } = req.params;
  const deleteProduct = await productService.deleteProduct(_id);
  res.status(sucess).json(deleteProduct);
};


module.exports = { getAllProduct, create , findById, editProduct, deleteProduct };
