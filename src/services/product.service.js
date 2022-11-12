const { productsModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const getAll = async () => {
  const result = await productsModel.getAll();
  if (result) return { type: null, message: result };

  return { type: 'LIST_NOT_FOUND', message: 'List not found' };
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