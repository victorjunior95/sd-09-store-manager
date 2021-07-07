const serverStatus = {
  ok: 200,
};

// dummy
const getAllSales = (req, res) => {
  res.status(serverStatus.ok).json({
    message: 'getAll on sales'
  });
};

// dummy
const getSaleById = (req, res) => {
  res.status(serverStatus.ok).json({
    message: 'getById on sales'
  });
};

module.exports = {
  getAllSales,
  getSaleById,
};
