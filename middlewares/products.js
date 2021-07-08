const validationName = (req, res, next) => {
    const name = req.body.name;
    if (name.length < 5) {
        res.status(422).json({
            err: {
                code: "invalid_data",
                message: '"name" length must be at least 5 characters long',
            }
        });
    }
    return next();
};

const validationQuantity = (req, res, next) => {
    const quantity = req.body.quantity;
   if (typeof(quantity) !== "number"){
    res.status(422).json({
        err: {
            code: 'invalid_data',
            message: '"quantity" must be a number',
          },
    });
   }
    if (quantity <= 0 || quantity % 1 !== 0) {
        res.status(422).json({
            err: {
                code: 'invalid_data',
                message: '"quantity" must be larger than or equal to 1',
              },
        });
    }
    return next();
};


module.exports = {
    validationName,
    validationQuantity
};
