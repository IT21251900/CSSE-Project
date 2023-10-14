const express = require("express");
const {
  createRequestOrder,
  allRequestOrders,
  editRequestOrder,
  singleRequestOrder,
  deleteRequestOrder,
} = require("../controllers/requestOrderController");

const router = express.Router();

router.post("/", createRequestOrder);
router.get("/", allRequestOrders);
router.get("/:id", singleRequestOrder);
router.put("/:id", editRequestOrder);
router.delete("/:id", deleteRequestOrder);

module.exports = router;
