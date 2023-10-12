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

module.exports = {
	createSupplier,
};
