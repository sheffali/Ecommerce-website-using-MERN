var express = require('express')
var router = express.Router()

router.get("/signout",(req,res)=>{
    res.send("signout")
});

module.exports = router;
