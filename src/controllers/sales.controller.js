const { salesServices } = require('../services');

const createSale = async (req, res) => {
  const { type, message } = await salesServices.createSale(req.body);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, message } = await salesServices.getAllSales();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesServices.getSaleById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};