const express = require('express');
const {
  createOrder,
  allOrders,
  editOrder,
  singleOrder,
  deleteOrder,
} = require('../controllers/OrderTestController');

const router = express.Router();

router.post('/', createOrder);
router.get('/', allOrders);
router.get('/:id', singleOrder);
router.put('/:id', editOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
