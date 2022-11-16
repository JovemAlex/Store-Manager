const express = require('express');
const { productController } = require('../controllers');
const validateProductId = require('../middlewares/validateProductId');
const validateProductName = require('../middlewares/validateProductName');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id', validateProductId, productController.getById);

router.post('/', validateProductName, productController.createProduct);

router.put('/:id', validateProductName, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;