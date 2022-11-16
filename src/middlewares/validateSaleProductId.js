const { checkSale } = require('../services/validations/schemas');

module.exports = (req, res, next) => {
  const sales = req.body;

  const required = [];

  sales.forEach(({ productId, quantity }) => {
    const { error } = checkSale.validate({ productId, quantity });

    if (error) { required.push(error); }
  });

  if (required.length) return res.status(400).json({ message: required[0].message });

  return next();
};