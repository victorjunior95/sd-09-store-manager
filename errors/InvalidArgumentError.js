class InvalidArgumentError extends Error {
  /**
   *
   * @param {string} message An error message to display in the body of the response
   */
  constructor(message) {
    super();
    this.name = 'InvalidArgumentError';
    this.code = 'invalid_data';
    this.message = message;
  }
}

module.exports = InvalidArgumentError;
