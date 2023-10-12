const Supplier = require('../models/supplier');

const createSupplier = async (req, res) => {
	try {
		const { name, email, address, phone } = req.body;

		const existingSupplier = await Supplier.findOne({ email });
		if (existingSupplier) {
			return res.status(400).json({ error: 'Email is already in use' });
		}

		const supplier = new Supplier({
			name,
			email,
			address,
			phone,
		});

		await supplier.save();
		res.status(201).json({ message: 'Supplier created successfully' });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while creating the supplier' });
	}
};

const allSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.find();
		res.status(200).json({ suppliers });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching the suppliers' });
	}
};

const singleSupplier = async (req, res) => {
	try {
		const supplier = await Supplier.findById(req.params.id);
		if (!supplier) {
			return res.status(404).json({ error: 'Supplier not found' });
		}
		res.status(200).json({ supplier });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching the supplier' });
	}
};

const editSupplier = async (req, res) => {
	try {
		const { name, email, address, phone } = req.body;

		const supplier = await Supplier.findById(req.params.id);
		if (!supplier) {
			return res.status(404).json({ error: 'Supplier not found' });
		}

		const existingSupplier = await Supplier.findOne({ email });
		if (existingSupplier && existingSupplier._id.toString() !== req.params.id) {
			return res.status(400).json({ error: 'Email is already in use' });
		}

		supplier.name = name;
		supplier.email = email;
		supplier.address = address;
		supplier.phone = phone;

		await supplier.save();
		res.status(200).json({ message: 'Supplier updated successfully' });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while updating the supplier' });
	}
};

module.exports = {
	createSupplier,
	allSuppliers,
	singleSupplier,
	editSupplier,
};
