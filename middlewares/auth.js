const jwt = require("jsonwebtoken");

const authentcate = (req, res, next) => {
  const token = req.header("Authorization");

  jwt.verify(token, process.env.JWT_SECRET, function (err, claims) {
    if (err) {
      throw new Error("Bad Credentials. You are not authenticated.");
    }

    res.locals.claims = claims;
    next();
  });
};

const authorize = (allowedRole) => {
  return (req, res, next) => {
    const claims = res.locals.claims;

    if (allowedRole !== claims.role) {
      throw new Error("You are not authorized");
    }

    next();
  };
};

module.exports = {
  authentcate,
  authorize,
};
