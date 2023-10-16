const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Import route files for each collection
const supplierRoutes = require('./routes/supplier.routes');
const orderRoutes = require('./routes/orderTest.routes');
const procurementOfficerRoutes = require('./routes/procumentOfficer.routes');
const requestOrderRoutes = require('./routes/requestOrder.routes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(bodyParser.json());

// Use the routes for each collection with appropriate base paths
app.use('/supplier', supplierRoutes);
app.use('/orders', orderRoutes);
app.use('/procurement-officers', procurementOfficerRoutes);
app.use('/request-orders', requestOrderRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = app;
