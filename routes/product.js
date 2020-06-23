const express = require("express")
const router =express.Router();

const{isAuthenticated,isSignedIn,isAdmin} =require("../controllers/auth")
const{getUserById} =require("../controllers/user")
const{getProductById,createProduct} =require("../controllers/product")


//param
router.param("userId", getUserById);
router.param("productId",getProductById);

//routes


router.post(
    "/product/create/:userId"
    ,isAuthenticated,
    isSignedIn,
    isAdmin,
    createProduct)


module.exports =router;