const express = require('express');
const { createSupplier } = require('../controllers/supplierController');

const router = express.Router();

router.post('/create', createSupplier);

module.exports = router;
