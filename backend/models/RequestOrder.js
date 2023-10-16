const mongoose = require("mongoose");

const requestOrderSchema = new mongoose.Schema({
  requestOrderID: {
    type: String
  },
  orderID: {
    type: String,
    required: true,
  },
  supplierID: {
    type: String,
  },
  comments: String, // Not required
  procurementOfficerID: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected",
      "assigned",
      "sent",
      "acknowledged",
      "inprogress",
      "delivered",
      "payed",
    ],
    required: true,
  },
});

const RequestOrder = mongoose.model("RequestOrder", requestOrderSchema);

module.exports = RequestOrder;
