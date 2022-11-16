const { salesServices } = require('../services');

const createSale = async (req, res) => {
  const { type, message } = await salesServices.createSale(req.body);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createSale,
};