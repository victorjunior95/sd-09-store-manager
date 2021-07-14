class OperationError extends Error {
  constructor() {
    super();
    this.name = 'OperationError';
    this.code = 'stock_problem';
    this.message = 'Such amount is not permitted to sell';
  }
}

module.exports = OperationError;
