const verifyQtdArray = (array) => {
  if (array.every((item) => typeof item.quantity !== 'number' || item.quantity < 1 )) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  };
  // return array;
};

// console.log(verifyQtdArray([
//   {
//     productId: '3123213213',
//     quantity: -15 
//   },
//   {
//     productId: '232132',
//     quantity: 15
//   },
// ]));

module.exports = verifyQtdArray;
