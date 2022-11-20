const { salesModel, productsModel } = require('../models');

const createSale = async (sales) => {
  const error = [];

  await Promise.all(sales.map(async ({ productId }) => {
    const productExists = await productsModel.getById(productId);
    if (productExists === undefined) error.push(productExists);
  }));

  if (error.length) return { type: 404, message: 'Product not found' };

  const saleId = await salesModel.insertSale();

  await Promise.all(sales.map(async (sale) => salesModel.createSale(saleId, sale)));
  const result = { id: saleId, itemsSold: sales };

  return { type: null, message: result };
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();

  // console.log(result);
  const responseOfGetAll = await Promise.all(result.map(async ({ saleId, productId, quantity }) => {
    const { date } = await salesModel.getSaleDateById(saleId);
    const response = { saleId, productId, quantity, date };
    // console.log(response);
    return response;
  }));

  if (responseOfGetAll.length) {
    return { type: null, message: responseOfGetAll };
  }

  return { type: 404, message: 'Sale not found' };
};

const getSaleById = async (id) => {
  const result = await salesModel.getSalesById(id);

  console.log(result);

  const getByIdSales = await Promise.all(result.map(async ({ saleId, productId, quantity }) => {
    const { date } = await salesModel.getSaleDateById(saleId);
    const response = { date, productId, quantity };
    return response;
  }));

  if (getByIdSales.length) {
    return { type: null, message: getByIdSales };
  }

  return { type: 404, message: 'Sale not found' };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};