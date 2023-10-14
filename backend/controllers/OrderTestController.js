const Order = require("../models/OrderTest");

// Create an Order
const createOrder = async (req, res) => {
  try {
    const { orderID, orderName } = req.body;
    const order = new Order({ orderID, orderName });
    await order.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the Order" });
  }
};

// Get all Orders
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching Orders" });
  }
};

// Get a single Order by ID
const singleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Order" });
  }
};

// Update an Order
const editOrder = async (req, res) => {
  try {
    const { orderID, orderName } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.orderID = orderID;
    order.orderName = orderName;
    await order.save();
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the Order" });
  }
};

// Delete an Order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Order" });
  }
};

module.exports = {
  createOrder,
  allOrders,
  singleOrder,
  editOrder,
  deleteOrder,
};
