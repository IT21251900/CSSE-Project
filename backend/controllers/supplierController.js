const Supplier = require('../models/Supplier');
const bcrypt = require('bcrypt');

// create supplier
const createSupplier = async (req, res) => {
	try {
		const { name, email, address, phone, password } = req.body;

		if (!name || !email || !address || !phone || !password) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		const existingSupplier = await Supplier.findOne({ email });
		if (existingSupplier) {
			return res.status(400).json({ error: 'Email is already in use' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const supplier = new Supplier({
			name,
			email,
			address,
			phone,
			password: hashedPassword,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		});

		await supplier.save();
		res.status(201).json({ message: 'Supplier created successfully' });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while creating the supplier' });
	}
};

// get all suppliers
const allSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.find();
		res.status(200).json({ suppliers });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching the suppliers' });
	}
};

// get single supplier by id
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

// edit supplier
const editSupplier = async (req, res) => {
	try {
		const { name, email, address, phone } = req.body;

		if (!name || !email || !address || !phone) {
			return res.status(400).json({ error: 'All fields are required' });
		}

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
		supplier.updatedAt = Date.now();

		await supplier.save();
		res.status(200).json({ message: 'Supplier updated successfully' });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while updating the supplier' });
	}
};

// delete supplier
const deleteSupplier = async (req, res) => {
	try {
		const supplier = await Supplier.findById(req.params.id);
		if (!supplier) {
			return res.status(404).json({ error: 'Supplier not found' });
		}
		await supplier.deleteOne();
		res.status(200).json({ message: 'Supplier deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while deleting the supplier' });
	}
};

module.exports = {
	createSupplier,
	allSuppliers,
	singleSupplier,
	editSupplier,
	deleteSupplier,
};
