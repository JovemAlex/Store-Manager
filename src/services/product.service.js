const { productsModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const getAll = async () => {
  const result = await productsModel.getAll();

  return { type: null, message: result };
};

const getById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const result = await productsModel.getById(id);
  if (result) return { type: null, message: result };
  
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAll,
  getById,
};