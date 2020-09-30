const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout success"
  });
};

///protected routes
exports.isSignedIn = expressJwt({
  secret:process.env.SECRET,
  userProperty: "auth"
});

//custom routes
exports.isAuthenticated=(req,res,next)=>{
let checker =req.profile && req.auth && req.profile._id==req.auth._id
//only sets when user has logged in  
if(!checker){
  return res.status(403).json({
    error:"ACCESS DENIED"
  });
}
next();
}

exports.isAdmin=(req,res,next)=>{
if(req.profile.role ==0)
{
  return res.status(403).json({
    error:"You ain't admin!!"
  });
}
  next();
}

//checking if email exists already or not
exports.checkEmail=(req, res, next)=> {
  var email = req.body.email;
  var checkexistingemail = User.findOne({ email: email });
  checkexistingemail.exec((err, data) => {
    if (err){
      return  res.status(403).json({
        error:"Some Error Occured"
      });

    }
    if (data) {
      return res.json({
        message: "Email Already Exists"
   
      }); 
    }
    next();
  });
}

