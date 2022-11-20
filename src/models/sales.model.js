const camelize = require('camelize');
const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () value ()',
  );
  return insertId;
};

const createSale = async (id, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );
  const object = { id, productId, quantity };
  return object;
};

const getSaleDateById = async (id) => {
  const [[result]] = await connection.execute(
    `SELECT date FROM StoreManager.sales WHERE id = ${id}`,
  );
  return result;
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products WHERE sale_id = ${id}`,
  );
  return camelize(result);
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return camelize(result);
};

module.exports = {
  createSale,
  insertSale,
  getSaleDateById,
  getAllSales,
  getSalesById,
};