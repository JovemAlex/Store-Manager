const express = require('express');
const productController = require('../controllers/products.controller');
const validateProductId = require('../middlewares/validateProductId');
const validateProductName = require('../middlewares/validateProductName');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id', validateProductId, productController.getById);

router.post('/', validateProductName, productController.createProduct);

module.exports = router;