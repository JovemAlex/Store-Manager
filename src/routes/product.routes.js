const express = require('express');
const productController = require('../controllers/products.controller');
const validateProductId = require('../middlewares/validateProductId');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id', validateProductId, productController.getById);

router.post('/', productController.createProduct);

module.exports = router;