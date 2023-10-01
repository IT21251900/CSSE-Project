const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		if (!uri) {
			throw new Error('MongoDB URI is not defined in the .env file.');
		}

		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
