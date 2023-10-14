const RequestOrder = require('../models/RequestOrder');

// Create a Request Order
const createRequestOrder = async (req, res) => {
  try {
    const {
      requestOrderID,
      orderID,
      supplierID,
      comments,
      procurementOfficerID,
      progress,
    } = req.body;

    const requestOrder = new RequestOrder({
      requestOrderID,
      orderID,
      supplierID,
      comments,
      procurementOfficerID,
      progress,
    });

    await requestOrder.save();
    res.status(201).json({ message: 'Request Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the Request Order' });
  }
};

// Get all Request Orders
const allRequestOrders = async (req, res) => {
  try {
    const requestOrders = await RequestOrder.find();
    res.status(200).json({ requestOrders });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching Request Orders' });
  }
};

// Get a single Request Order by ID
const singleRequestOrder = async (req, res) => {
  try {
    const requestOrder = await RequestOrder.findById(req.params.id);
    if (!requestOrder) {
      return res.status(404).json({ error: 'Request Order not found' });
    }
    res.status(200).json({ requestOrder });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the Request Order' });
  }
};

// Update a Request Order
const editRequestOrder = async (req, res) => {
  try {
    const {
      requestOrderID,
      orderID,
      supplierID,
      comments,
      procurementOfficerID,
      progress,
    } = req.body;

    const requestOrder = await RequestOrder.findById(req.params.id);
    if (!requestOrder) {
      return res.status(404).json({ error: 'Request Order not found' });
    }

    requestOrder.requestOrderID = requestOrderID;
    requestOrder.orderID = orderID;
    requestOrder.supplierID = supplierID;
    requestOrder.comments = comments;
    requestOrder.procurementOfficerID = procurementOfficerID;
    requestOrder.progress = progress;

    await requestOrder.save();
    res.status(200).json({ message: 'Request Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the Request Order' });
  }
};

// Delete a Request Order
const deleteRequestOrder = async (req, res) => {
  try {
    const requestOrder = await RequestOrder.findById(req.params.id);
    if (!requestOrder) {
      return res.status(404).json({ error: 'Request Order not found' });
    }

    await requestOrder.deleteOne();
    res.status(200).json({ message: 'Request Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the Request Order' });
  }
};

module.exports = {
  createRequestOrder,
  allRequestOrders,
  singleRequestOrder,
  editRequestOrder,
  deleteRequestOrder,
};
