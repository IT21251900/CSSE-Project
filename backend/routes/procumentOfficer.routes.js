const express = require('express');
const {
  createProcurementOfficer,
  allProcurementOfficers,
  editProcurementOfficer,
  singleProcurementOfficer,
  deleteProcurementOfficer,
} = require('../controllers/procumentOfficerController');

const router = express.Router();

router.post('/', createProcurementOfficer);
router.get('/', allProcurementOfficers);
router.get('/:id', singleProcurementOfficer);
router.put('/:id', editProcurementOfficer);
router.delete('/:id', deleteProcurementOfficer);

module.exports = router;
