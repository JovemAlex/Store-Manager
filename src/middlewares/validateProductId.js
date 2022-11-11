module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Product not found' });

  if (id > 3) return res.status(404).json({ message: 'Product not found' });

  return next();
};