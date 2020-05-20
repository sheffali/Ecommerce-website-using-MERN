const { check, validationResult } = require('express-validator');
var express = require('express')
var router = express.Router()
const {signout,signup} = require("../controllers/auth")

router.post("/signup",[
    check("name","name should be atleast 3 char").isLength({min :3}),
    check("email","email required").isEmail(),
    check("password","passord atleast 4 ").isLength({min: 4})
],signup);
router.get("/signout",signout);

module.exports = router;
