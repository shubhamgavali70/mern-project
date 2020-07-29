const express = require("express");
const router = express.Router();
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getAllUniqueCategory,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserByID } = require("../controllers/user");
//params
router.param("userID", getUserByID);
router.param("productID", getProductById);

//all routes
//create
router.post(
  "/product/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read
router.get("/product/:productID", getProduct);
//frontend
router.get("/product/photo/:productID", photo);

//delete
router.delete(
  "/product/:productID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
//update
router.put(
  "/product/:productID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listing all routes
router.get("/products", getAllProduct);

router.get("/products/category", getAllUniqueCategory);

module.exports = router;
