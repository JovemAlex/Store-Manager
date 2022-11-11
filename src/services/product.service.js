const { productsModel } = require('../models');

const getAll = async () => {
  const result = await productsModel.getAll();

  return { type: null, message: result };
};

const getById = async (id) => {
  const result = await productsModel.getById(id);

  return { type: null, message: result };
};

module.exports = {
  getAll,
  getById,
};