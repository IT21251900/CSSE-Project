const express = require('express');
const {
	createSupplier,
	allSuppliers,
	editSupplier,
	singleSupplier,
	deleteSupplier,
} = require('../controllers/supplierController');

const router = express.Router();

router.get('/:id', singleSupplier);
router.put('/:id', editSupplier);
router.delete('/:id', deleteSupplier);
router.get('/', allSuppliers);
router.post('/', createSupplier);

module.exports = router;
