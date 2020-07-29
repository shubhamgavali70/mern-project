const express = require("express");
const router = express.Router();

const {
  getUserByID,
  getUser,
  updateUser,
  userPurchaseList,
  pushOrderInPurchaseList,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserByID);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);
router.post(
  "orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList
);
//router.get("/users", getAllUsers);
module.exports = router;
