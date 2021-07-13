class NotFoundError extends Error {
  /**
   *
   * @param {string} entity The name of the entity the was not found
   */

  constructor(entity) {
    super();
    this.name = 'NotFoundError';
    this.code = 'not_found';
    this.message = `${entity} not found`;
  }
};

module.exports = NotFoundError;
