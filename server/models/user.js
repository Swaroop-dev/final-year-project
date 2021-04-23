const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
  },
  email: {
    type: email,
    required: true,
  },
  encry_password: {
    type: String,
  },
  salt: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securepassword(password);
  })
  .get(
    function () {
      return this._password;
    },
    { timestamps: true }
  );

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.encry_password === this.securepassword(plainpassword);
  },

  securepassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
