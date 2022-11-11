const { productServices } = require('../services');

const getAll = async (_req, res) => {
  const { type, message } = await productServices.getAll();

  if (type) return res.status(type).json(message);

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.getById(id);

  if (type) return res.status(type).json(message);

  res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
};