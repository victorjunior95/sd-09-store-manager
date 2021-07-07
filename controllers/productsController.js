const serverStatus = {
  ok: 200,
};

// dummy
const getAllProducts = async (req, res) => {
  res.status(serverStatus.ok).json({
    message: 'getAll on products'
  });
};

// dummy
const getProductById = (req, res) => {
  res.status(serverStatus.ok).json({
    message: 'getById on products'
  });
};

module.exports = {
  getAllProducts,
  getProductById,
};
