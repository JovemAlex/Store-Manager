const { productsModel } = require('../../models');

const doesProductExists = async (id) => {
  const productExist = await productsModel.getById(id);
  if (!productExist) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  doesProductExists,
};