const express = require('express');
const { createSupplier, allSuppliers, editSupplier, singleSupplier } = require('../controllers/supplierController');

const router = express.Router();

router.post('/', createSupplier);
router.get('/:id', singleSupplier);
router.put('/:id', editSupplier);
router.get('/', allSuppliers);

module.exports = router;
