const { productsModel } = require('../models');
const { validateId, validateName } = require('./validations/validationsInputValues');

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

const createProduct = async (name) => {
  const error = validateName(name);
  if (error.type) return error;

  const result = await productsModel.createProduct(name);
  if (result) return { type: null, message: result };

  return { type: 'PRODUCT_NOT_CREATED', message: 'Product not created' };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};