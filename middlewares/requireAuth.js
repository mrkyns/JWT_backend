const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You are not autohorized" });
  }

  //the auth in headers is structured as follows
  // "Bearer jfKSJADFHBIkjudhf.ikajsfdbhniasujhfd.aisjuxdhbnfnasujdh"
  // we only need the second part of it
  const token = authorization.split(" ")[1];

  try {
    // verifying token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // adding user ID to header after authentification
    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    res.status(401).json({ error: "You are not supposed to be here" });
  }
};

module.exports = requireAuth;
