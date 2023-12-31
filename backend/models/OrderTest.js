const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderID: String,
  orderName: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
