const mongooose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongooose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating a custom static method for sign up
userSchema.statics.signup = async function (email, password) {
  //check if user exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  //make sure that user insert email and password
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  //validate email
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }

  //validate password
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure that use at least 8 char, one uppercase, one lowercase, one number and one symbol"
    );
  }

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create user in DB
  const user = await this.create({ email, password: hash });

  return user;
};

// creating a custom static method for login
userSchema.statics.login = async function (email, password) {
  //check if i have both fields
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  const user = await this.findOne({ email });

  // check if email is correct
  if (!user) {
    throw Error("Incorrect email");
  }

  // check if password is correct
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongooose.model("User", userSchema);
