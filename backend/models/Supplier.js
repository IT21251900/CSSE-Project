const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
	name: String,
	email: String,
	address: String,
	phone: String,
	password: String,
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
