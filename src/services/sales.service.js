const { salesModel, productsModel } = require('../models');

const createSale = async (sales) => {
  const error = [];

  await Promise.all(sales.map(async ({ productId }) => {
    const productExists = await productsModel.getById(productId);
    if (productExists === undefined) error.push(productExists);
  }));

  if (error.length > 0) return { type: 404, message: 'Product not found' };

  const saleId = await salesModel.insertSale();

  await Promise.all(sales.map(async (sale) => salesModel.createSale(saleId, sale)));
  const result = { id: saleId, itemsSold: sales };

  return { type: null, message: result };
};

module.exports = {
  createSale,
};