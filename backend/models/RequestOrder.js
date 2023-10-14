const mongoose = require("mongoose");

const requestOrderSchema = new mongoose.Schema({
  requestOrderID: String,
  orderID: String,
  supplierID: String,
  comments: String,
  procurementOfficerID: String,
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
  },
});

const RequestOrder = mongoose.model("RequestOrder", requestOrderSchema);

module.exports = RequestOrder;
