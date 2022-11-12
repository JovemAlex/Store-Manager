const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const getById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id',
    [id],
  );

  return camelize(result);
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  return { id: insertId, name };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};