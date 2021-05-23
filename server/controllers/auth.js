const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error_message: "could not save the user data",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  });
};

exports.signin = (req, res) => {
  const { phoneNumber, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ phoneNumber }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "user email doesnot exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: " phoneNumber and password does not match",
      });
    }
    //creating token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, name, email, role, phoneNumber, deviceid } = user;

    return res.json({
      token,
      user: { _id, name, email, role, phoneNumber, deviceid },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Your are our user,not an admin",
    });
  }
  next();
};

exports.addContact = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "missing attribute",
    });
  }
  const { confirmedPatient, suspectedContacts } = req.body;

  var patients = new Array();
  const detail = {};
  User.find({ deviceid: confirmedPatient }, (err, user) => {
    if (err) {
      return res.json({
        error: "User not found",
      });
    }
    // console.log(user)
  });
  for (i = 0; i < suspectedContacts.length; i++) {
    User.find({ deviceid: suspectedContacts[i] }, (err, user1) => {
      if (err) {
        return res.json({ eror: "could find device id attribute" });
      }

      const { deviceid, phoneNumber, name } = user1[0];
      var obj = {
        deviceid: deviceid,
        phoneNumber: phoneNumber,
        name: name,
      };

      patients.push(obj)
      console.log(patients)
      User.findOneAndUpdate(
        { deviceid: confirmedPatient },
        { $push: { contacts: obj } },
        (err, user2) => {
          if (err) {
            return res.json({ error: "could not add attribute" });
          }
        }
      );
      
    });
  }
  ;
  User.find({ deviceid: confirmedPatient }, (err, user) => {
    if (err) {
      return res.json(err)
    }
    return res.json(user)
  })
  
};
