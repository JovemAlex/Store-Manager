const { checkSaleQuantity } = require('../services/validations/schemas');

module.exports = (req, res, next) => {
  const sales = req.body;

  const verify = [];

  sales.forEach(({ productId, quantity }) => {
    const { error } = checkSaleQuantity.validate({ productId, quantity });

    if (error) { verify.push(error); }
  });

  if (verify.length) return res.status(422).json({ message: verify[0].message });

  return next();
};