const tratarError = (status, code, message) => {
  return { status, code, message };
};

module.exports = tratarError;