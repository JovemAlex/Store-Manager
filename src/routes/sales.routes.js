const express = require('express');
const validateSaleProductId = require('../middlewares/validateSaleProductId');
const validateSaleQuantity = require('../middlewares/validateSaleQuantity');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', validateSaleProductId, validateSaleQuantity, salesController.createSale);

module.exports = router;