const isValid = (name, quantity) => {
  let validationObj = {
    nameType: false,
    qtyType: false,
    qtyValue: false,
  };
  const validQtyReference = 0;
  const validLengthReference = 5;
  if (!name || typeof name !== 'string' || name.length < validLengthReference) {
    validationObj.nameType = '"name" length must be at least 5 characters long';
  };
  if (quantity <= validQtyReference ) {
    validationObj.qtyValue ='"quantity" must be larger than or equal to 1';
  };
  if (!quantity || typeof quantity !== 'number') {
    validationObj.qtyType = '"quantity" must be a number';
  }
  return validationObj;
};

const validateReturn = async (name, quantity) => {
  const { nameType, qtyType, qtyValue } = isValid(name, quantity);
  const code = 'invalid_data';
  if(nameType) {
    return {
      err: {
        code,
        message: nameType,
      },
    };
  }

  if(qtyValue) {
    return {
      err: {
        code,
        message: qtyValue,
      },
    };
  }

  if(qtyType) {
    return {
      err: {
        code,
        message: qtyType,
      },
    };
  }

  return 'aprove';
  
};

module.exports = {
  isValid,
  validateReturn,
};
