const express = require('express');
const { createSupplier, allSuppliers } = require('../controllers/supplierController');

const router = express.Router();

router.post('/create', createSupplier);
router.get('/', allSuppliers);

module.exports = router;
