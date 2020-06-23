const express = require("express");
const router = express.Router();

const { getProductById, createProduct ,getProduct,photo,updateProduct,deleteProduct,getAllProducts} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//create routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read routes
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

//update routes
router.put(
  "/product/:productId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
updateProduct);

//delete routes 
router.delete(
  "/product/:productId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
deleteProduct);
//listing routes
router.get("/product",getAllProducts)


module.exports = router;
