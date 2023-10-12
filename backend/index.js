const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const supplierRoutes = require('./routes/supplier.routes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use('/supplier', supplierRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
