const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "At least 3 letters needed for a first name"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "At least 3 letters needed for a last name"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), // email@gmail.com
        message: "Please enter a valid email"
      }      
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }
  }, {timestamps: true});

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    console.log('validating password and confirm password')
    console.log(this.password)
    console.log(this.confirmPassword)
    if (this.password !== this.confirmPassword) {
        console.log('passwords DO NOT MATCHED')
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    else {
        console.log('PASSWORDS DO MATCH')
    }
    next();
});
  
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        console.log('HASING PASSWORD')
        console.log(hash)
        this.password = hash;
        next();
      });
});

const User = mongoose.model("User", UserSchema)

module.exports = User;