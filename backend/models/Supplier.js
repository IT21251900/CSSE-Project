const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	address: { type: String, required: true },
	phone: { type: String, required: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
