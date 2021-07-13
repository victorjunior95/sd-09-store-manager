const verifyName = (name) => {
  const five = 5;
  if (name.length < five) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
};

module.exports = verifyName;
