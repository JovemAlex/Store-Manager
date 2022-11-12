const { productServices } = require('../services');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { type, message } = await productServices.getAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.getById(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
};