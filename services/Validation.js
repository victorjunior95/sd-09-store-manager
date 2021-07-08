const isValid = (name, quantity) => {
  let validationObj = {
    nameType: 1,
    qtyType: 1,
    qtyValue: 1,
  };
  const validQtyReference = 0;
  const validLengthReference = 5;
  if (!name || typeof name !== 'string' || name.length < validLengthReference) {
    validationObj.nameType = '"name" length must be at least 5 characters long';
  };
  if (!quantity || typeof quantity !== 'number') {
    validationObj.qtyType = '"quantity" must be a number';
  }
  if (quantity < validQtyReference) {
    validationObj.qtyValue ='"quantity" must be larger than or equal to 1';
  };
  return validationObj;
};

const validateReturn = async (name, quantity) => {
  const { nameType, qtyType, qtyValue } = isValid(name, quantity);

  if(nameType != 1) {
    return {
      error: {
        code: 'invalid_data',
        message: nameType,
      },
    };
  }

  if(qtyType != 1) {
    return {
      error: {
        code: 'invalid_data',
        message: qtyType,
      },
    };
  }

  if(qtyValue != 1) {
    return {
      error: {
        code: 'invalid_data',
        message: qtyValue,
      },
    };
  }

  return 'aprove';
  
};

module.exports = {
  isValid,
  validateReturn,
};
