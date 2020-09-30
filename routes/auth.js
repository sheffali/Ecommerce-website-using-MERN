const { check, validationResult } = require('express-validator');
var express = require('express')
var router = express.Router()
const {signout,signup,signin,isSignedIn,checkEmail} = require("../controllers/auth");

router.post("/signup",[
    check("name","name should be atleast 3 char").isLength({min :3}),
    check("email","email required").isEmail(),
    check("password","passord atleast 4 ").isLength({min: 4})
],signup
);

router.post("/signin",[
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 1 })
    ],signin
  );
  
  router.get("/signout", signout);


  router.get("/testroute",isSignedIn ,(req,res) =>
  {
    res.json(req.auth);
  })
  
  module.exports = router;
