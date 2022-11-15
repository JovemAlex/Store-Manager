const { productsModel } = require('../models');
const { validateId, validateName } = require('./validations/validationsInputValues');
const { doesProductExists } = require('./validations/validateProduct');

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

const updateProduct = async (id, name) => {
  const errorId = validateId(id);
  if (errorId.type) return errorId;

  const errorName = validateName(name);
  if (errorName.type) return errorName;

  const productExist = await productsModel.getById(id);
  if (productExist) {
    const result = await productsModel.updateProduct(id, name);
    if (result) return { type: null, message: result };
  }

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const deleteProduct = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const { type, message } = await doesProductExists(id);
  if (type) return { type, message };

  await productsModel.deleteProduct(id);

  return { type: null };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};