const nameSize = 4;

const verifyField = {
  name: (name) => name.length > nameSize,
  quantity: (qtt) => qtt >= 1,
};

module.exports = verifyField;
