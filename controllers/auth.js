var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const User = require("../models/user")
const { check, validationResult } = require('express-validator');

exports.signup = (req,res) =>{
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(422).json({
        error: errors.array()[0].msg

    });
}
    
    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
    
};

exports.signout = (req,res) =>{
    res.json({
        message : "signout using json"
    });
};


exports.signin=(req,res) =>{
    const {email,password}=req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email},(err,user)=>{
        if(err){
            res.status(400).json({
                error: "USER EMAIL DOESNOT EXIST"
            })
        }
    if(user.authenticate(password)){
       return res.status(401).json({
            error: "EMAIL AND PASSWORD DONOT Match"
        })
    }
    const token=jwt.signin({id:user._id},process.env.SECRET)
    //put token in cookie
    res.cookie("token",token,{expire: new Date( + 9999)});
    //send response to frontend
    const {_id,name,email,role}=user;
    return res.json({token,user:{_id,name,email,role}})
    })
};