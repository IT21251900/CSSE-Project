const mongoose = require('mongoose');

const procurementOfficerSchema = new mongoose.Schema({
  procumentOfficerID: String,
  procumentOfficerName: String,
});

const ProcurementOfficer = mongoose.model('ProcurementOfficer', procurementOfficerSchema);

module.exports = ProcurementOfficer;
