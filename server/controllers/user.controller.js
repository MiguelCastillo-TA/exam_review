const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.createUser = (req, res) => {
    console.log(req.body)
    User.create(req.body)
    .then((newUser) => {
        res.json({user: newUser})
    })
    .catch((err) => {
        res.status(400).json({errors: err})
    })
}

module.exports.loginUser = (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        res.json({ msg: "invalid login attempt" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(passwordIsValid => {
            console.log(passwordIsValid)
            if (passwordIsValid) {
            const secret = "vfdv732cdcw@";
              const newJWT = jwt.sign({
                    _id: user._id
              }, secret)
              console.log(newJWT)
              res
                .cookie("usertoken", newJWT,{
                  httpOnly: true
                })
                .json({ msg: "success!" });
            } else {
              res.json({ msg: "invalid login attempt" });
            }
          })
          .catch(err => res.json({ msg: "invalid login attempt" }));
      }
    })
    .catch(err => res.json(err));

}

module.exports.getAll = (req, res) => {
    const users = User.find()
    .then(users => {
        res.json({users: users})
    })
}