const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserByID } = require("../controllers/user");
const { getToken, processPayment } = require("../controllers/paymentB");

router.param("userID", getUserByID);

router.get("/payment/gettoken/:userID", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:userID",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
