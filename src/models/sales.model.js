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

module.exports = {
  createSale,
  insertSale,
};