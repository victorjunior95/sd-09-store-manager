const validateName = (name) => {
  if ((typeof name) !== 'string') {
    return { err: {
      message: '"name" must be a string',
      code: 'invalid_data'
    }};
  }

  const min = 6;
  if (name.length < min) {
    return {err: {
      message: '\"name\" length must be at least 5 characters long',
      code: 'invalid_data'
    }};
  }
  return {};
};

module.exports = validateName;
