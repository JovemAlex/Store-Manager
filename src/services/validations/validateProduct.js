const { productsModel } = require('../../models');

const doesProductExists = async (id) => {
  const productExist = await productsModel.getById(id);
  if (!productExist) return { type: 404, message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  doesProductExists,
};