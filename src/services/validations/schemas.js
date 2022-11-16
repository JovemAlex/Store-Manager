const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.string().min(5).required().label('name');

const saleSchema = Joi.number().integer().required();
const saleQuantitySchema = Joi.number().integer().min(1).required();

const checkSale = Joi.object({
  productId: saleSchema.label('productId'),
  quantity: saleSchema.label('quantity'),
}).required();

const checkSaleQuantity = Joi.object({
  productId: saleSchema.label('productId'),
  quantity: saleQuantitySchema.label('quantity'),
});

module.exports = {
  idSchema,
  nameSchema,
  checkSale,
  checkSaleQuantity,
};