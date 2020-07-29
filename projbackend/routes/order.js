const express = require("express");
const router = express.Router();
const { getUserByID, pushOrderInPurchaseList } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

const {
  getOrderByID,
  createOrder,
  getAllOrder,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");
const { updateStock } = require("../controllers/product");

//param
router.param("userID", getUserByID);
router.param("orderID", getOrderByID);

//actual routes
//create
router.post(
  "/order/create/:userID",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//read
router.get(
  "/order/all/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrder
);

//status
router.get(
  "/order/status/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderID/status/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
