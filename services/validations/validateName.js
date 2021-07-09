const isValidName = (name) => {
  if (!name || typeof name !== 'string' || name.length < Number('5')) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return false;
};

module.exports = {
  isValidName,
};