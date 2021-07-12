const err ={
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  }
};
const errNotFound = {
  err: {
    code:'not_found',
    message:'Sale not found',
  }
};

const errDelete = {
  err: {
    code:'invalid_data',
    message:'Wrong sale ID format',
  }
};

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

const saleValid = (SoldList) => {
  if (!SoldList) return({
    err: {
      message: 'Such amount is not permitted to sell',
      code: 'not found',
    }
  });
  const minQuantity = 0;
  const qtyType = SoldList
    .map(({ quantity }) => quantity)
    .every((quantity) => typeof quantity === 'number' && quantity > minQuantity);
  if (!qtyType) return (err);

  return qtyType;
};

const validUpdate = (quantity) => {
  const validQtyReference = 0;
  if(typeof quantity != 'number' || quantity <= validQtyReference) return(err);

  return true;
};

module.exports = {
  isValid,
  validateReturn,
  saleValid,
  validUpdate,
  err,
  errDelete,
  errNotFound,
};
